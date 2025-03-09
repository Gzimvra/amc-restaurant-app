const bcrypt = require('bcrypt');
const saltRounds = 10;

// Function to hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

// Function to compare a plain password with a hashed password
const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
