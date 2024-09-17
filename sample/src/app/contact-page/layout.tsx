import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import "../globals.css";

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <div>
        <div className="flex flex-1 justify-center items-center flex-col w-screen">
          test
        </div>
        <div className="flex flex-1 justify-center items-center flex-col w-screen">
          {children}
        </div>
        <div className="flex flex-1 justify-center items-center flex-col w-screen">
        <Link href="/" className="text-gray-300 px-1 py-2 rounded">Home</Link>
        </div>
    </div>
  );
}