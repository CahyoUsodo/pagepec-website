import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const email = process.argv[2] || "admin@example.com";
  const password = process.argv[3] || "admin123";
  const name = process.argv[4] || "Admin";

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Admin user created successfully!");
    console.log(`Email: ${user.email}`);
    console.log(`Password: ${password}`);
    console.log("\n⚠️  Please change the password after first login!");
  } catch (error: any) {
    if (error.code === "P2002") {
      console.error("❌ User with this email already exists!");
    } else {
      console.error("❌ Error creating admin user:", error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

