import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/utils/hash-password";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";

export default function NewPost() {
  async function createPost(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const hashedPassword = saltAndHashPassword(password);
    console.log(hashedPassword);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (user) {
      revalidatePath("/login");
      redirect("/login");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <Form action={createPost} className="space-y-6">
        <div>
          <Label htmlFor="title" className="block text-lg mb-2">
            Name
          </Label>
          <Input
            type="text"
            id="title"
            name="name"
            placeholder="Enter your post title"
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
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
          Create User
        </Button>
      </Form>
    </div>
  );
}
