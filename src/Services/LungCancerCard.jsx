import React, { useState, useRef } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  Box,
} from "@mui/material";

// ✅ Import local image correctly
import lungImage from "../assets/images/lung.jpg";

const LungCancerCard = () => {
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showEmergencyButton, setShowEmergencyButton] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = async (e) => {
    setMessage("");
    setErrorMsg("");

    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setErrorMsg("Unsupported file type. Please upload PNG, JPG, or PDF.");
      fileRef.current.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/predict/lung-cancer",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 120000,
        }
      );

      if (res.data.error) {
        setErrorMsg(res.data.error);
      } else {
        setMessage(res.data.message);
        setShowEmergencyButton(true);
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error ||
          `Server error: ${err.response?.status || err.message}`
      );
    } finally {
      setLoading(false);
      fileRef.current.value = "";
    }
  };

  const handleEmergencyClick = () => {
    setDialogOpen(true);
  };

  const handleDialogOk = () => {
    setDialogOpen(false);
    setShowEmergencyButton(false);
    setMessage("");
  };

  return (
    <Card className="services-card">
      {/* ✅ Use imported image */}
      <img
        className="card-image"
        src={lungImage}
        alt="Lung Cancer Prediction"
      />
      <div className="card-content-wrapper">
        <Typography className="title" fontWeight="bold">
          Lung Cancer Prediction
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          Upload your PNG/JPG/PDF to assess lung cancer indicators.
        </Typography>

        {/* Choose File OR Emergency Button */}
        {!showEmergencyButton ? (
          <label
            style={{
              fontWeight: "bold",
              marginTop: "10px",
              padding: "8px 16px",
              borderRadius: "4px",
              textTransform: "none",
              cursor: "pointer",
              display: "inline-block",
              backgroundColor: "#90ee90",
              border: "1px solid #ccc",
            }}
          >
            Choose File
            <input
              ref={fileRef}
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              style={{
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
              onChange={handleChange}
            />
          </label>
        ) : (
          <Button
            variant="outlined"
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              fontWeight: "bold",
              backgroundColor: "#90ee90",
              border: "1px solid #ccc",
              color: "black",
            }}
            onClick={handleEmergencyClick}
          >
            Emergency Tablet
          </Button>
        )}

        {/* Loader, Error, or Message */}
        {loading && <CircularProgress size={20} style={{ marginTop: 8 }} />}
        {errorMsg && (
          <Typography color="error" style={{ marginTop: "8px" }}>
            {errorMsg}
          </Typography>
        )}
        {message && (
          <Typography
            style={{
              marginTop: "8px",
              color: message.toLowerCase().includes("normal")
                ? "green"
                : message.toLowerCase().includes("benign")
                ? "orange"
                : "red",
            }}
          >
            {message}
          </Typography>
        )}

        {/* Emergency Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleDialogOk}
          PaperProps={{
            style: {
              width: "auto",
              maxWidth: "fit-content",
              padding: "16px",
            },
          }}
        >
          <DialogTitle>Emergency Tablet Suggestion</DialogTitle>
          <DialogContent style={{ paddingBottom: "0px" }}>
            <Box display="flex" alignItems="flex-start" gap={2}>
              <Box>
                <Typography style={{ color: "red", fontWeight: "bold" }}>
                  If you're unable to contact a doctor immediately:
                </Typography>
                <Typography style={{ color: "red", fontWeight: "bold" }}>
                  Take one of the following tablets (at your own risk):
                </Typography>
                <List dense>
                  <ListItem>Dexamethasone</ListItem>
                  <ListItem>Morphine</ListItem>
                  <ListItem>Gefitinib</ListItem>
                  <ListItem>Lorazepam</ListItem>
                </List>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* ✅ Use imported image again */}
                <img
                  src={lungImage}
                  alt="Lung"
                  style={{ width: "200px", height: "auto", borderRadius: "4px" }}
                />
                <Button
                  onClick={handleDialogOk}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#90ee90",
                    border: "1px solid #ccc",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default LungCancerCard;
