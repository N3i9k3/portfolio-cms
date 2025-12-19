const prisma = require("../config/db"); // make sure this points to your Prisma client
const { hashPassword } = require("./hash"); // imports hash function

async function createAdmin() {
  const email = "admin@cms.com";
  const password = "admin123";

  // Hash the password
  const hashed = await hashPassword(password);

  // Insert admin user into User table
  await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: "admin",
    },
  });

  console.log("Admin user created ✅");
  process.exit();
}

createAdmin();
