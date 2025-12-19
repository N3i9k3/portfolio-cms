const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createAdmin() {
  const email = "admin@gmail.com";
  const password = "admin123";

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "admin"
    }
  });

  console.log("✅ Admin created successfully");
  process.exit();
}

createAdmin().catch(err => {
  console.error(err);
  process.exit(1);
});
