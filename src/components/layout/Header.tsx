'use client';

import { signOut } from 'next-auth/react';

interface HeaderProps {
  userEmail?: string;
}

export default function Header({ userEmail }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="text-xl font-bold text-blue-600">TaskFlow</span>

        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden text-sm text-gray-600 sm:inline">{userEmail}</span>
          )}
          <button
            type="button"
            onClick={() => signOut()}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
