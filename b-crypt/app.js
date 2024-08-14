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
