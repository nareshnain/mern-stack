const UserModel = require('../model/user')

// routes/User.js
const express = require('express');
const UserController = require('../controllers/user');
const router = express.Router();

/**
 * @swagger
 * /user:
 *   get:
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
router.get('/:id', UserController.findOne);

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
 *               email:
 *                 type: string
 *               lastName:
 *                type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *   summary: Updates a user by ID
 *  responses:
 *    200:
 *      description: A successful response
 */
router.patch('/:id', UserController.update);

router.delete('/:id', UserController.destroy);

module.exports = router;
