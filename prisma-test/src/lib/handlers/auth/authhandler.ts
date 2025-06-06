"use server";

import { saltAndHashPassword } from "@/utils/hash-password";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { signupFormSchema } from "@/lib/schemas/auth/authschema";


export async function signupHandler(values: z.infer<typeof signupFormSchema>) {
  try {
    const { name, email, password } = values;

    const hashedPassword = saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: "User creation failed",
    };
  }
}
