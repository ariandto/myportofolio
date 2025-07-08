require("dotenv").config();
const crypto  = require("crypto");
const express = require("express");
const { exec } = require("child_process");

const app  = express();
const PORT = 5000;                 // bebas, cukup bukakan firewall

app.use(express.json({ verify: rawBodySaver }));
function rawBodySaver(req, res, buf) { req.rawBody = buf; }

/* -------- Helper verifikasi signature (keamanan) -------- */
function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const hmac = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(req.rawBody)
    .digest("hex");

  return `sha256=${hmac}` === signature;
}

/* ---------------- Endpoint Webhook ---------------------- */
app.post("/github", (req, res) => {
  if (!verifySignature(req)) {
    console.log("⚠️  Signature mismatch – ignoring request");
    return res.status(401).end("Invalid signature");
  }

  console.log("✅ Webhook diterima, jalankan deploy.sh …");
  exec("bash /www/wwwroot/myportofrontend/deploy.sh", (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Deploy error: ${err.message}`);
      return res.status(500).end("Deploy error");
    }
    console.log(stdout);
    res.end("Deployed!");
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Webhook listener aktif di http://localhost:${PORT}/github`)
);
