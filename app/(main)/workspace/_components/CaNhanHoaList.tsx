"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { XacThucContext } from '@/context/XacThucContext';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useContext, useEffect, useState } from 'react'
import { CANHANHOA } from '../../ai-canhanhoa/page';
import AICaNhanHoaList from '@/services/AICaNhanHoaList';
import Image from 'next/image';
import { CaNhanHoaContext } from '@/context/CaNhanHoaContext';

function CaNhanHoaList() {
    const{user} = useContext(XacThucContext);
    const convex = useConvex();

    const [caNhanHoaList, setCaNhanHoaList]=useState<CANHANHOA[]>([]); // de set du lieu = result, nho la 1 danh sach
    const {canhanhoa,setCaNhanHoa}=useContext(CaNhanHoaContext);

    useEffect(() => {
      user && GetUserCaNhanHoa();
    }, [user]);
    // Hàm này lấy danh sách người dùng cá nhân hóa từ Convex
    const GetUserCaNhanHoa = async () => {
      const result = await convex.query(api.userAiCaNhanHoa.GetAllUserCaNhanHoa, {
          uid: user._id, // Truy vấn dữ liệu dựa trên ID người dùng
      });
      console.log(result);
      setCaNhanHoaList(result);
    };
  return (
    <div className='p-5 bg-secondary border-r-[1px] h-screen'>
        <h2 className='font-bold text-lg'>Danh Sách AI Của Bạn</h2>
        <Button className='w-full mt-3'>+ Thêm AI Mới</Button>
        <Input className='bg-white mt-3' placeholder='Tìm kiếm'/>
        <div className='mt-5'>
            {/* dung canhanhoaList de hien thi nhung ai da chon chu khong  phai AiCaNhanHoaList la list AI All*/}
            {caNhanHoaList.map((canhanhoa,index)=>(
                // cho chữ va ảnh nằm trên 1 dòng gap-3 items-center
                <div className='p-2 mt-2 flex gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer' 
                key={index} onClick={()=>setCaNhanHoa(canhanhoa)}>
                    {/* image cua nextjs */}
                    <Image src={canhanhoa.image} alt={canhanhoa.name}
                        width={60}
                        height={60}
                        className='rounded-xl w-[60px] h-[60px] object-cover'
                    />
                    <div>
                        <h2 className='font-bold'>{canhanhoa.name}</h2>
                        <h2 className='text-gray-600 dark:text-gray-300 text-sm'>{canhanhoa.title}</h2>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CaNhanHoaList