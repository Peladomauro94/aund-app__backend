const bcrypt = require("bcrypt");

const userService = require("../services/user");

const { isValidEmail } = require("./validation");

const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middlewares/validate-jwt");

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

    const existingUserByEmail = await userService.getUserByEmail(email);

    if (existingUserByUsername) {
      return res.status(400).json({ error: "Username already in use", usernameError : true });
    }

    if (existingUserByEmail) {
      return res.status(400).json({ error: "Email already in use", emailError : true });
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const userData = {
      username,
      email,
      password,
    };

    const user = await userService.createUser(userData);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      TOKEN_SECRET
    );

    res.status(201).json({ message: "User Registered", token, username });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = registerController;
