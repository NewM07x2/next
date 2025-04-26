"use client";

import { Provider } from 'urql';
import React from 'react';
import client from '../grapql/urqlClient';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider value={client}>{children}</Provider>
      </body>
    </html>
  );
}