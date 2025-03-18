"use client"
import { XacThucContext } from '@/context/XacThucContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Header() {
  const {user}=useContext(XacThucContext);
  return (
    <div className='pl-8 fixed shadow-sm flex justify-between items-center px-14' >
      <Image src={'/logo.svg'} alt='logo' width={200} height={200}/>
      {user?.picture&&<Image src={user?.picture} alt='logo' 
      width={40} 
      height={40} 
      className='rounded-full'/>}
      {/* lay thong tin tu data base, lam tiep bên provider de hien thi anh, sua lai user?.picture can phai cau hinh o next.config.ts*/}
    </div>
  )
}

export default Header