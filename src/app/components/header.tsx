import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";

const linkrouter = [
  { name: "About", path: "/about" },
  { name: "Posts", path: "/" },
  { name: "Categories", path: "/categories" },
]

export default function Header() {
  const pathname = usePathname();
  return (
    <div className='flex flex-col'>
      <Link href="/" className="font-bold">
        Srpiple's Blog
      </Link>
      <div className="flex flex-col p-6 w-5">
        {
          linkrouter.map((link) => (
            <Link key={link.name} className={pathname === link.path ? "text-yellow-300" : ""} href={link.path}>{link.name}</Link>
          ))
        }
      </div>
    </div>
  )
}
