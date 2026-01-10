const UserModel = require('../model/user');

// routes/User.js
const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate'); // Path to your middleware file


/**
 * @swagger
 * /user:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Returns a list of users
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/', UserController.findAll);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
router.get('/:id', authenticateToken, UserController.findOne);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *     security:
 *       - bearerAuth: []
 *  summary: Updates a user by ID
 *  parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: The ID of the user
 *       schema:
 *        type: string
 *  responses:
 *    200:
 *      description: A successful response
 */
router.patch('/:id', authenticateToken, UserController.update);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *     security:
 *       - bearerAuth: []
 *  summary: Updates a user by ID
 *  parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: The ID of the user
 *       schema:
 *        type: string
 *  responses:
 *    200:
 *      description: A successful response
 */
router.delete('/:id', authenticateToken, UserController.destroy);

module.exports = router;
