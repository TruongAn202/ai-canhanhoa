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
import { BlurFade } from '@/components/magicui/blur-fade';
import ThemMoiCaNhanHoa from './ThemMoiCaNhanHoa';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserCircle2 } from 'lucide-react';
import ProFile from './ProFile';


function CaNhanHoaList() {
  const { user } = useContext(XacThucContext);
  const convex = useConvex();

  const [caNhanHoaList, setCaNhanHoaList] = useState<CANHANHOA[]>([]); // de set du lieu = result, nho la 1 danh sach
  const { canhanhoa, setCaNhanHoa } = useContext(CaNhanHoaContext);

  const [openProfile, setOpenProfile]=useState(false);

  useEffect(() => {
    user && GetUserCaNhanHoa();
  }, [user && canhanhoa == null]);//cap nhat ngay danh sach cac AI còn lại sau khi xoa
  // Hàm này lấy danh sách người dùng cá nhân hóa từ Convex
  const GetUserCaNhanHoa = async () => {
    const result = await convex.query(api.userAiCaNhanHoa.GetAllUserCaNhanHoa, {
      uid: user._id, // Truy vấn dữ liệu dựa trên ID người dùng
    });
    console.log(result);
    setCaNhanHoaList(result);
  };
  return (
    <div className='p-5 bg-secondary border-r-[1px] h-screen relative'>
      <h2 className='font-bold text-lg'>Danh Sách AI Của Bạn</h2>
      <ThemMoiCaNhanHoa>
        <Button className='w-full mt-3 cursor-pointer'>+ Thêm AI Mới</Button>
      </ThemMoiCaNhanHoa>
      <Input className='bg-white mt-3' placeholder='Tìm kiếm' />
      <div className='mt-5'>
        {/* dung canhanhoaList de hien thi nhung ai da chon chu khong  phai AiCaNhanHoaList la list AI All*/}
        {caNhanHoaList.map((canhanhoa_, index) => (
          <BlurFade key={canhanhoa_.image} delay={0.25 + index * 0.05} inView>
            {/* cho chữ va ảnh nằm trên 1 dòng gap-3 items-center */}
            <div className={`p-2 mt-2 flex gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer
                  ${canhanhoa_.id == canhanhoa?.id && 'bg-gray-200'} 
                `}
              //  ${canhanhoa_.id==canhanhoa?.id&&'bg-gray-200' nghia la khi 1 AI được chọn, background sẽ thành màu xám
              key={index} onClick={() => setCaNhanHoa(canhanhoa_)}>
              {/* image cua nextjs */}
              <Image src={canhanhoa_.image} alt={canhanhoa_.name}
                width={60}
                height={60}
                className='rounded-xl w-[60px] h-[60px] object-cover'
              />
              <div>
                <h2 className='font-bold'>{canhanhoa_.name}</h2>
                <h2 className='text-gray-600 dark:text-gray-300 text-sm'>{canhanhoa_.title}</h2>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='absolute bottom-10 flex gap-3 items-center hover:bg-gray-200 w-[90%] p-2 rounded-xl cursor-pointer'>
          {/* tranh loi user?.picture co chuoi rong thi nextjs hien canh bao */}
          {user?.picture ? (<Image src={user.picture} alt="user" width={35} height={35} className='rounded-full' />) : null}
          <div>
            <h2 className='font-bold'>{user?.name}</h2>
            <h2 className='text-sm text-gray-400'>{user?.orderId ? 'VIP' : 'Miễn Phí'}</h2>
          </div>
        </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={()=>setOpenProfile(true)}><UserCircle2/> Thông tin</DropdownMenuItem>
          <DropdownMenuItem><LogOut/> Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* setOpenDialog={setOpenProfile} để nút X thoát hoạt động */}
        <ProFile openDialog={openProfile} setOpenDialog={setOpenProfile}/>
    </div>
  )
}

export default CaNhanHoaList