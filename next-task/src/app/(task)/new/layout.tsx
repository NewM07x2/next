import React from 'react'

const Mainlayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='bg-slate-50 flex-1 overflow-auto  new-class'>{children}</main>
  )
}

export default Mainlayout
