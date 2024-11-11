import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import "../globals.css";

import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
        <div className="flex flex-1 justify-center items-center flex-col w-screen h-full">
          {children}
        </div>
    </>
  );
}