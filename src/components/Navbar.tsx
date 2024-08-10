import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Navbar = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = isUserAuthenticated ? await getUser() : null;


  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Code<span className='text-red-600'>Fury</span>
          </Link>
          <div className='h-full flex items-center space-x-4'>
            {isUserAuthenticated ? (
              <>
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt="User Profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium">{user?.username}</span>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                <Link
                  href="/api/auth/logout"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}>
                  Sign Out
                </Link>

                {/* Additional authenticated user options here */}
              </>
            ) : (
              <>
                <Link
                  href="/api/auth/register"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}>
                  Sign Up
                </Link>
                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                <Link
                  href="/api/auth/login"
                  className={buttonVariants({ size: "sm", variant: "ghost" })}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar;
