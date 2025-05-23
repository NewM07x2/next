'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import SideMenu from "@/components/SideMenu/SideMenu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='flex h-screen'>
        <SideMenu />
        <Provider store={store}>
          <main className='bg-slate-50 flex-1 overflow-auto layout-class'>{children}</main>
        </Provider>
    </div>
      </body>
    </html> 
  );
}
