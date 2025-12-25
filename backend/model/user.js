var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email address is required.'],
        lowercase: true, // Automatically converts email to lowercase
        trim: true,      // Removes leading/trailing whitespace
        unique: true,    // Ensures uniqueness (this is an index helper, not a validator)
        match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/,
        'Please enter a valid email address.'
        ]
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'guest', 'customer'],
        default: 'user'
    },
    address: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'blocked'],
        default: 'active'
    }
});
var user = new mongoose.model('User', schema);
module.exports = user;
