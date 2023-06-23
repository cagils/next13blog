/* eslint-disable @next/next/no-img-element */
import { prisma } from "@/prisma/db";
import Markdown from "markdown-to-jsx";

export const revalidate = 2;

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx0auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See what users are writing now.
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Stimulate your mind with the best recycled ideas.
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.createdAt.toISOString()}
                    className="text-gray-500"
                  >
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "full",
                    }).format(post.createdAt)}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-semibold text-gray-600 hover:bg-gray-100 uppercarse">
                    {post.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span>
                      <span className="absolute inset-0" />
                      {post.title}
                    </span>
                  </h3>
                  <Markdown className="mt-5 prose prose-sm">
                    {post.content}
                  </Markdown>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={post.author?.image!}
                    alt={post.author?.name!}
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span>
                        <span className="absolute inset-0" />
                        {post.author?.name}
                      </span>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
