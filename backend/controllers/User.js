const UserModel = require('../model/user')
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../utils/transporter');
const { generateSecurePassword } =  require('../utils/common');
const jwt = require("jsonwebtoken");

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    // const generatedPassword = generateSecurePassword();
    const generatedPassword = 'Temp@12345';
    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(generatedPassword, 15);

    // *************
    // In a real application, you would save the username and **hashedPassword**
    // to your database here.
    // *************
    const user = new UserModel({
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        role: req.body.role,
        address: req.body.address,
        status: req.body.status
    });
    
    await user.save().then(async data => {
        // Send the plaintext generated password to the user via email
        await sendEmail(req.body.email, req.body.firstName, req.body.username, generatedPassword);
        res.send({
            message:"User created successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    
    const id = req.params.id;
    
    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

// Authenticate user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });
    if (!user) {
        return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }
    // Generate JWT token
    const token = jwt.sign(
        { userId: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    res.json({ message: 'Authentication successful', token: token, userRole: user.role, fullName: user.firstName + ' ' + user.lastName, id: user._id});
};
// @desc Update a user
