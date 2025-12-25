const express = require('express');
const authRouter = express.Router();
const UserController = require('../controllers/user');

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
authRouter.post('/', UserController.login);
module.exports = authRouter;