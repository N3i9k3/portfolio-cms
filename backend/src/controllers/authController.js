const prisma = require("../config/db"); // Your Prisma client
const { comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Missing credentials" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return res.status(401).json({ message: "Invalid email or password" });

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid email or password" });

  const token = generateToken({
    id: user.id,
    role: user.role,
  });

  res.json({
    token,
    user: { id: user.id, email: user.email },
  });
};
