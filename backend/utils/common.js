const generator = require('generate-password');

const generateSecurePassword = () => {
    const password = generator.generate({
        length: 15,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
    });
    return password;
};
module.exports = { generateSecurePassword };
