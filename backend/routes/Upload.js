const express = require('express');
const uploadRouter = express.Router();
const UploadController = require('../controllers/Upload');

uploadRouter.post('/upload', UploadController.uploadFile.single('image'), UploadController.uploadImage);
module.exports = uploadRouter;
