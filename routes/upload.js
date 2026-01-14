const express = require('express');
const multer = require('multer')
const extractTextFromPDF = require('../utils/extractText');
const chunkText = require("../utils/chunkText");
const Chunk = require("../models/Chunk");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
})

const upload = multer({ storage: storage });


router.post("/upload", upload.single("pdf"), async (req, res) => {
  const filePath = req.file.path;

  const text = await extractTextFromPDF(filePath);
  const chunks = chunkText(text, 1000);

  for (const chunkContent of chunks) {
    await Chunk.create({
      content: chunkContent,
      source: req.file.originalname
    })
  }

  res.json({
    message: "Text extracted successfully",
    textPreview: text.substring(0, 1000),
    totalChunks: chunks.length
  });

  console.log(text);
});

module.exports = router;
