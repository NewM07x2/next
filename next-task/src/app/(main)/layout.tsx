import React from 'react'

import SideMenu from '@/components/SideMenu/SideMenu';

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='bg-slate-50 flex-1 overflow-auto'>{children}</main>
  )
}

export default Mainlayout
