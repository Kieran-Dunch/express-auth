const bcrypt = require("bcrypt");

// Create password hashing function below:

const passwordHash = async (password, saltRounds) => {
  try {
    // a salt is random data that is used as an additional input to a one-way function that hashes data
    const salt = await bcrypt.genSalt(saltRounds);
    // hash the password with the salt
    const hash = await bcrypt.hash(password, salt);
    // return the hash
    return hash;
  } catch (err) {
    // if there is an error, log it
    console.log(err);
  }
  // if there is an error, return null
  return null;
};

// Create your password comparison function below:
// this fucntion receives the plaintext password, and hashes it to compare to the stored hash
const comparePasswords = async (password, hash) => {
  try {
    // compare the plaintext password to the hash
    const matchFound = await bcrypt.compare(password, hash);
    // if a match is found, return true
    return matchFound;
  } catch (err) {
    // if there is an error, log it
    console.log(err);
  }
  // if there is an error, return false
  return false;
};
