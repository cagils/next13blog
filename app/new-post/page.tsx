import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/prisma/db";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  async function addPost(formData: FormData) {
    "use server";
    const title = String(formData.get("title"));
    const content = String(formData.get("content"));
    const category = String(formData.get("category"));
    const authorId = session?.user.id;
    await prisma.post.create({
      data: {
        title,
        content,
        category,
        authorId,
      },
    });
    redirect("/");
  }

  return (
    <div className="px-6 pt-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Create Your Post
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Share your knowledge with the world.
        </p>
      </div>
      <form action={addPost} className="mx-auto max-w-xl mt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select required name="category">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="space=y-2">
          <Label htmlFor="title">Title</Label>
          <Input required type="text" id="title" name="title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea required id="content" rows={10} name="content" />
        </div>
        <Button type="submit" className="w-full">
          Submit Post
        </Button>
      </form>
    </div>
  );
}
