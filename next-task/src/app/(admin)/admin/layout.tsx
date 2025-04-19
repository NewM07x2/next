import React from 'react'

import SideMenu from '@/components/SideMenu/SideMenu';

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='flex h-screen'>
      <main className='bg-red-300 flex-1 overflow-auto'>{children}</main>
    </div>
  )
}

export default Mainlayout
