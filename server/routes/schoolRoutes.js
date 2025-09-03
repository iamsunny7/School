import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import School from "../models/School.js";

const router = express.Router();

// Multer + Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "schoolfinder",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const upload = multer({ storage });

// ➡️ Add School
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;

    const newSchool = new School({
      name,
      address,
      city,
      state,
      contact,
      email_id,
      image: req.file.path, // Cloudinary returns URL
    });

    await newSchool.save();
    res.json({ message: "School added successfully!", school: newSchool });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➡️ Get Schools
router.get("/", async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
