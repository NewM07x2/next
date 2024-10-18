'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"

interface NaxItemProps {
  label: string,
  link: string,
  icon: React.ReactNode
}

const NavItem = ({ label, link, icon }: NaxItemProps) => {
  const pathname = usePathname()
  return (
    <li className="w-full text-white hover:text-gray-950 hover:bg-gray-100 ">
      <Link href={link} className={`p-2 gap-2 no-underline hover:text-gray-900 flex justify-start items-center ${pathname === link ? 'bg-gray-100 text-gray-900' : ''}`}>
        <div>{icon}</div>
        <div>{label}</div>
      </Link>
    </li>
  );
}

export default NavItem
