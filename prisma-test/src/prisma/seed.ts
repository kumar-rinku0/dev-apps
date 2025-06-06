import { PrismaClient } from "@/app/generated/prisma"; // adjust path as needed

const prisma = new PrismaClient();

const userData = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    password: "12341234",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    password: "12341234",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
