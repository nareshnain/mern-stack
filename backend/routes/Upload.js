const express = require('express');
const uploadRouter = express.Router();
const UploadController = require('../controllers/Upload');

uploadRouter.post('/upload', UploadController.uploadFile.single('image'), UploadController.uploadImage);
uploadRouter.post('/upload-audio-video', UploadController.uploadAudioVideoFile.single('mediaFile'), UploadController.uploadAudioVideo);
module.exports = uploadRouter;
