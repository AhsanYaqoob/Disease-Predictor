import re
import os
import cv2
import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pdf2image import convert_from_path
import pytesseract
from tensorflow.keras.models import load_model as keras_load_model

# --- CONFIG ---
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTS = {"png", "jpg", "jpeg", "pdf"}
LIVER_MODEL_PATH = "models/liver_disease_model.pkl"
DENGUE_MODEL_PATH = "models/dengue_model.pkl"
MALARIA_MODEL_PATH = "models/malaria_rf_model.pkl"
LUNG_MODEL_PATH = "models/best_densenet_model.h5"
FRONTEND_ORIGIN = "http://localhost:3000"

# --- APP SETUP ---
app = Flask(__name__)
CORS(app, resources={r"/predict/*": {"origins": FRONTEND_ORIGIN}, r"/api/v1/*": {"origins": FRONTEND_ORIGIN}}, supports_credentials=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --- MODEL LOAD ---
def load_model_safely(path, is_keras=False):
    try:
        return keras_load_model(path) if is_keras else joblib.load(path)
    except Exception as e:
        print(f"Error loading model from {path}: {e}")
        return None

liver_model = load_model_safely(LIVER_MODEL_PATH)
dengue_model = load_model_safely(DENGUE_MODEL_PATH)
malaria_model = load_model_safely(MALARIA_MODEL_PATH)
lung_model = load_model_safely(LUNG_MODEL_PATH, is_keras=True)

# --- HELPERS ---
def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[-1].lower() in ALLOWED_EXTS

def extract_text(img: np.ndarray) -> str:
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) if img.ndim == 3 else img
    return pytesseract.image_to_string(gray)

def extract_numeric_features(text: str, count: int) -> np.ndarray:
    nums = re.findall(r"\d+\.?\d*", text)
    if len(nums) < count:
        raise ValueError(f"OCR found only {len(nums)} numbers, need {count}")
    vals = [float(x) for x in nums[:count]]
    return np.array(vals, dtype=np.float32).reshape(1, -1)

def is_valid_medical_report(text: str) -> bool:
    keywords = [
        "report", "patient", "diagnosis", "test", "result", "reference range",
        "laboratory", "clinical", "specimen", "pathology", "medical", "hospital"
    ]
    return any(k.lower() in text.lower() for k in keywords)

def is_related(text: str, keywords: list) -> bool:
    return any(k.lower() in text.lower() for k in keywords)

def predict_model(model, text, n_feats, keywords, message_if_valid, message_if_invalid):
    if not is_valid_medical_report(text):
        return jsonify(error="Please upload a valid medical report."), 400
    if not is_related(text, keywords):
        return jsonify(error=message_if_invalid), 400

    try:
        data = extract_numeric_features(text, n_feats)
        pred = model.predict(data)[0]
        if isinstance(pred, (np.ndarray, list)):
            pred = pred[0]
        pred = round(float(pred))

        if pred == 1:
            message = message_if_valid
        elif pred == 0:
            message = "Your health is good."
        else:
            message = f"Unexpected prediction result: {pred}"

        return jsonify(prediction=str(pred), message=message), 200
    except Exception as e:
        return jsonify(error=f"Server exception: {e}"), 500

# --- ROUTES ---

@app.route("/predict/liver-disease", methods=["OPTIONS", "POST"], strict_slashes=False)
def predict_liver():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    if "file" not in request.files:
        return jsonify(error="No file part"), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify(error="Unsupported or empty file"), 400

    fname = secure_filename(file.filename)
    fpath = os.path.join(app.config["UPLOAD_FOLDER"], fname)
    file.save(fpath)

    try:
        ext = fname.rsplit(".", 1)[1].lower()
        if ext == "pdf":
            pages = convert_from_path(fpath, first_page=1, last_page=1)
            img = cv2.cvtColor(np.array(pages[0]), cv2.COLOR_RGB2BGR)
        else:
            img = cv2.imread(fpath)

        text = extract_text(img)
        keywords = ["liver", "hepatitis", "bilirubin", "alt", "ast", "alkaline phosphatase"]
        return predict_model(
            liver_model, text, liver_model.n_features_in_,
            keywords,
            message_if_valid="You are infected. Kindly contact a doctor.",
            message_if_invalid="Please upload a liver-related medical report."
        )
    except Exception as e:
        return jsonify(error=f"Server exception: {e}"), 500
    finally:
        if os.path.exists(fpath): os.remove(fpath)

@app.route("/predict/dengue", methods=["OPTIONS", "POST"], strict_slashes=False)
def predict_dengue():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    if "file" not in request.files:
        return jsonify(error="No file part"), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify(error="Unsupported or empty file"), 400

    fname = secure_filename(file.filename)
    fpath = os.path.join(app.config["UPLOAD_FOLDER"], fname)
    file.save(fpath)

    try:
        ext = fname.rsplit(".", 1)[1].lower()
        if ext == "pdf":
            pages = convert_from_path(fpath, first_page=1, last_page=1)
            img = cv2.cvtColor(np.array(pages[0]), cv2.COLOR_RGB2BGR)
        else:
            img = cv2.imread(fpath)

        text = extract_text(img)
        keywords = ["dengue", "platelets", "fever", "infection", "ns1", "igg", "igm"]
        return predict_model(
            dengue_model, text, dengue_model.n_features_in_,
            keywords,
            message_if_valid="You are infected. Please consult a doctor.",
            message_if_invalid="Please upload a dengue-related medical report."
        )
    except Exception as e:
        return jsonify(error=f"Server exception: {e}"), 500
    finally:
        if os.path.exists(fpath): os.remove(fpath)

@app.route("/predict/malaria", methods=["OPTIONS", "POST"], strict_slashes=False)
def predict_malaria():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    if "file" not in request.files:
        return jsonify(error="No file part"), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify(error="Unsupported or empty file"), 400

    fname = secure_filename(file.filename)
    fpath = os.path.join(app.config["UPLOAD_FOLDER"], fname)
    file.save(fpath)

    try:
        ext = fname.rsplit(".", 1)[1].lower()
        if ext == "pdf":
            pages = convert_from_path(fpath, first_page=1, last_page=1)
            img = cv2.cvtColor(np.array(pages[0]), cv2.COLOR_RGB2BGR)
        else:
            img = cv2.imread(fpath)

        text = extract_text(img)
        keywords = ["malaria", "Hemoglobin", "platelets", "fever", "infection", "ns1", "igg", "igm", ]
        return predict_model(
            malaria_model, text, malaria_model.n_features_in_,
            keywords,
            message_if_valid="You have symptoms of malaria. Please consult a doctor for further procedure.",
            message_if_invalid="Please upload a malaria-related medical report."
        )
    except Exception as e:
        return jsonify(error=f"Server exception: {e}"), 500
    finally:
        if os.path.exists(fpath): os.remove(fpath)

@app.route("/predict/lung-cancer", methods=["OPTIONS", "POST"], strict_slashes=False)
def predict_lung():
    if request.method == "OPTIONS":
        return jsonify({}), 200

    if not lung_model:
        return jsonify(error="Lung model is not loaded."), 500

    if "file" not in request.files:
        return jsonify(error="No file part"), 400

    file = request.files["file"]
    if file.filename == "" or not allowed_file(file.filename):
        return jsonify(error="Unsupported or empty file"), 400

    fname = secure_filename(file.filename)
    fpath = os.path.join(app.config["UPLOAD_FOLDER"], fname)
    file.save(fpath)

    try:
        ext = fname.rsplit(".", 1)[1].lower()
        if ext == "pdf":
            pages = convert_from_path(fpath, first_page=1, last_page=1)
            img = cv2.cvtColor(np.array(pages[0]), cv2.COLOR_RGB2BGR)
        else:
            img = cv2.imread(fpath)

        if img is None:
            raise ValueError("Unable to read image content.")

        h, w = img.shape[:2]

        if len(img.shape) == 2 or (len(img.shape) == 3 and np.allclose(img[..., 0], img[..., 1]) and np.allclose(img[..., 1], img[..., 2])):
            is_grayscale = True
        else:
            return jsonify(error="Uploaded a valid Lung cancer report."), 400

        hist = cv2.calcHist([img], [0], None, [256], [0, 256])
        hist_norm = hist / hist.sum()
        if np.max(hist_norm) < 0.01:
            return jsonify(error="Histogram analysis failed. Image does not have expected intensity distribution."), 400

        resized = cv2.resize(img, (256, 256))
        data = np.expand_dims(resized, axis=0) / 255.0
        prediction = lung_model.predict(data)[0]
        pred_class = np.argmax(prediction)

        if pred_class == 0:
            message = "Your lungs appear healthy."
        elif pred_class == 1:
            message = "Lung cancer is in its early stages. Please seek medical consultation."
        elif pred_class == 2:
            message = "Lung cancer detected. Please seek urgent medical consultation."
        else:
            message = f"Unexpected prediction result: {pred_class}"

        return jsonify(prediction=str(pred_class), message=message), 200

    except Exception as e:
        return jsonify(error=f"Server exception: {e}"), 500
    finally:
        if os.path.exists(fpath): os.remove(fpath)

from flask import session

# --- USER AUTH ROUTES ---

@app.route("/api/v1/user/me", methods=["GET"])
def get_user():
    user = session.get("user")
    if user:
        return jsonify(user=user), 200
    else:
        return jsonify(error="Not logged in"), 401

@app.route("/api/v1/user/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    # Dummy registration logic for demonstration
    if email and password:
        # In real app, save user to database here
        return jsonify(message="Registration successful"), 201
    else:
        return jsonify(error="Missing email or password"), 400

@app.route("/api/v1/user/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    # Dummy authentication logic for demonstration
    # if email == "admin@example.com" and password == "password":
    #     session["user"] = {"email": email}
    #     return jsonify(message="Login successful", user={"email": email}), 200
    # else:
    #     return jsonify(error="Invalid credentials"), 401
    # Commented out login check to allow login without validation
    session["user"] = {"email": email}
    return jsonify(message="Login successful", user={"email": email}), 200

@app.route("/api/v1/user/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify(message="Logged out"), 200

# --- MAIN ---
if __name__ == "__main__":
    app.secret_key = "supersecretkey"  # Needed for session management
    app.run(debug=True)
