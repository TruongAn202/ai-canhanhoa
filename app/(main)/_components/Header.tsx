"use client"
import { XacThucContext } from '@/context/XacThucContext'
import Image from 'next/image'
import { usePathname } from "next/navigation"; //phai dung navigaton vì useRouter() chỉ hoạt động với Pages Router (thư mục /pages), nhưng hiện tại đang dùng app router
import React, { useContext } from 'react'

function Header() {
  const pathname = usePathname();
  const isPersonalizedAI = pathname === "/ai-canhanhoa";
  const {user}=useContext(XacThucContext);
  return (
    <div className={`pl-8 shadow-sm flex justify-between items-center px-14 ${isPersonalizedAI ? '' : 'fixed'}`}>
      <Image src={'/logo.svg'} alt='logo'  width={isPersonalizedAI ? 200 : 40} height={isPersonalizedAI ? 200 : 40}/>
      {user?.picture&&<Image src={user?.picture} alt='logo' 
      width={40} 
      height={40} 
      className='rounded-full'/>}
      {/* lay thong tin tu data base, lam tiep bên provider de hien thi anh, sua lai user?.picture can phai cau hinh o next.config.ts*/}
    </div>
  )
}

export default Header