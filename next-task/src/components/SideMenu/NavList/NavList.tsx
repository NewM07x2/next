import React from 'react'
import { FaRegCheckSquare, FaRegClock, FaTasks } from 'react-icons/fa'
import { VscNewFile } from "react-icons/vsc";

import NavItem from './NavItem/NavItem'

interface NavItemType {
  id: number,
  label: string,
  link: string,
  icon: React.ReactNode
}

const NavList = () => {
  const navListItems: NavItemType[] = [
    { id: 1, label: '全て', link: '/', icon: <FaTasks className='size-5'/>},
    { id: 2, label: '完了済み', link: '/completed', icon: <FaRegCheckSquare className='size-5'/>},
    { id: 3, label: '対応中', link: '/expired', icon: <FaRegClock className='size-5'/>},
    { id: 4, label: '新規', link: '/new', icon: <VscNewFile className='size-5'/>}
  ]
  return (
    <div className='mt-24'>
      <ul className='m-0 p-0 list-none'>
        {
          navListItems.map((item) => {
            return <NavItem key={item.id} label={item.label} link={item.link} icon={item.icon}/>
          })
        }
      </ul>
    </div>
  )
}

export default NavList
