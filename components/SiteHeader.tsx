"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SiteHeader() {
  const { data: session } = useSession();

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-x-12">
          <Link href="/" className="text-xl font-bold">
            Next13 Blog Sample
          </Link>
          <Link
            href="/new-post"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            New Post
          </Link>
        </div>
        <span className="flex items-center space-x-4">
          {session?.user && (
            <Avatar>
              <AvatarImage src={session.user.image} alt="@shadcn" />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
          )}
          <span>{session ? <SignOut /> : <LogIn />}</span>
        </span>
      </nav>
    </header>
  );
}

function LogIn() {
  return (
    <button
      onClick={() => signIn()}
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      Log in
    </button>
  );
}

function SignOut() {
  const router = useRouter();

  async function onSignOut() {
    await signOut();
    router.push("/api/auth/signin");
  }

  return (
    <button
      onClick={onSignOut}
      className="text-sm font-semibold leading-6 text-gray-900"
    >
      Sign Out
    </button>
  );
}
