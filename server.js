const express = require("express");

const app = express();
const jwt  =require("jsonwebtoken");
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("dotenv").config();

app.post("/api/token", async (req, res) => {
  try {
    const { name, contact_number, email } = req.body;

    const SECRET_KEY = process.env.JWT_SECRET;

    const now = Math.floor(Date.now() / 1000);

    const payload = {
      iss: "Online JWT Builder",
      iat: now,
      exp: now + 120,
      first_name: name,
      email: email,
      contact_number: contact_number,
    };

    const token = jwt.sign(payload, SECRET_KEY);

    console.log("Generated JWT:", token);

    return res.status(200).json({
      success: true,
      data: token,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
});

app.listen(3005, () => {
  console.log("server listening on 3005");
});
