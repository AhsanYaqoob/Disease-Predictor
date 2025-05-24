import { app } from "./App.js";
import { config } from "dotenv";

//  Load environment variables
config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err);
});
