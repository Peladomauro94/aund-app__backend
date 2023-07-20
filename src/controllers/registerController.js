const bcrypt = require("bcrypt");

const userService = require("../services/user");

const { isValidEmail } = require("./validation");

const registerController = async (req, res) => {
  const { username, email } = req.body;

  try {
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!username) {
      return res.status(400).json({ error: "Invalid username" });
    }

    if (!req.body.password) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const existingUserByUsername = await userService.getUserByUsername(
      username
    );
    const existingUserByEmail = await userService.getUserByUsername(email);

    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already in use" });
    }

    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const userData = {
      username,
      email,
      password,
    };

    const user = await userService.createUser(userData);

    res.status(201).json({ message: "User Registered", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = registerController;
