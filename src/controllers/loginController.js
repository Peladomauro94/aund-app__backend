const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middlewares/validate-jwt");

const userService = require("../services/user");

const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.getUserByUsernameOrEmail(username);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      TOKEN_SECRET
    );

    res.status(201).json({ message: "Successfully Login", token });
  } catch (e) {
    return res.status(500).json({ error: "Error creating user" });
  }
};

module.exports = loginController;
