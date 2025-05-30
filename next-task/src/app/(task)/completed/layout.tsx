import React from 'react'

const CompletedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='bg-slate-50 flex-1 overflow-auto completed-class'>{children}</main>
  )
}

export default CompletedLayout
