const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Store files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

exports.uploadFile = multer({ storage: storage });

//exports.uploadFile.single('image'), 

// POST route to handle file upload
exports.uploadImage = ((req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    // In a real app, you would upload this file to Cloudinary/S3 and get a URL, 
    // then save that URL to MongoDB as part of a new chat message.
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl: imageUrl, message: 'File uploaded successfully' });
});

