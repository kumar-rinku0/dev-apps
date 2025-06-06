import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { saltAndHashPassword, verifyPassword } from "@/utils/hash-password";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      console.log(password);
      const isRightUser = verifyPassword(password, user?.password);
      if (isRightUser) {
        revalidatePath("/");
        redirect("/");
      }
      console.log("this is right user", isRightUser);
    } else {
      console.log("user doesn't found.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">login application</h1>
      <Form action={handleLogin} className="space-y-6">
        <div>
          <Label htmlFor="content" className="block text-lg mb-2">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <Label htmlFor="password" className="block text-lg mb-2">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password..."
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
