import React from 'react'

const ExpiredLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='bg-slate-50 flex-1 overflow-auto'>{children}</main>
  )
}

export default ExpiredLayout
