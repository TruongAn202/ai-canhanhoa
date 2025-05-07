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
import { googleLogout } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
//ben trai
function CaNhanHoaList() {
  const { user, setUser } = useContext(XacThucContext); // Thông tin user
  const convex = useConvex();

  const [caNhanHoaList, setCaNhanHoaList] = useState<CANHANHOA[]>([]); // Danh sách AI cá nhân hóa
  const { canhanhoa, setCaNhanHoa } = useContext(CaNhanHoaContext);//useContext(...)là hook của React để truy cập dữ liệu từ một context đã được tạo sẵn,là nơi chứa trạng thái toàn cục của AI đang được chọn và hàm để cập nhật nó.

  const [openProfile, setOpenProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm

  const router = useRouter();

  useEffect(() => {
    user && GetUserCaNhanHoa();
  }, [user && canhanhoa == null]);//cap nhat ngay danh sach cac AI còn lại sau khi xoa

  const GetUserCaNhanHoa = async () => {// lấy danh sách người dùng cá nhân hóa từ Convex
    const result = await convex.query(api.userAiCaNhanHoa.GetAllUserCaNhanHoa, {
      uid: user._id,//Truy vấn dữ liệu dựa trên ID người dùng
    });
    setCaNhanHoaList(result);
  };
  //dang xuat
  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.clear();
    sessionStorage.clear();
    // Xóa cookie (nếu có)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    setTimeout(() => {
      router.push("/sign-in");
    }, 100);// Delay nhỏ để đảm bảo state được reset
  };
  //danh sách sau khi lọc
  const filteredList = caNhanHoaList.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='p-5 bg-secondary border-r-[1px] h-screen relative'>
      <h2 className='font-bold text-lg'>Danh Sách AI Của Bạn</h2>
      <ThemMoiCaNhanHoa>
        {/* Đã được setup (component), để mở cửa sổ thêm AI moi */}
        <Button className='w-full mt-3 cursor-pointer'>+ Thêm AI Mới</Button>
      </ThemMoiCaNhanHoa>
      
      <Input
      //tìm kiếm, gia tri ng dung nhap vao khung tim kiem, luu vao searchTerm
        className='bg-white mt-3'
        placeholder='Tìm kiếm'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='mt-5'>
        {filteredList.map((canhanhoa_, index) => (
          //duyệt trên danh sach da loc boi timm kiem
          <BlurFade key={canhanhoa_.image} delay={0.25 + index * 0.05} inView>
            <div className={`p-2 mt-2 flex gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer
              ${canhanhoa_.id == canhanhoa?.id && 'bg-gray-200'}`}//click vào 1 AI trong danh sách, nó sẽ được chọn (cập nhật vào canhanhoa)  thẻ AI đó sẽ đổi nền thành xám để highlight rằng nó đang được chọn.
              onClick={() => setCaNhanHoa(canhanhoa_)}>
              <Image
                src={canhanhoa_.image}
                alt={canhanhoa_.name}
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
          {/* click vào đây thì xổ ra dropdow */}
          <div className='absolute bottom-10 flex gap-3 items-center hover:bg-gray-200 w-[90%] p-2 rounded-xl cursor-pointer'>
            {user?.picture ? (
              <Image src={user.picture} alt="user" width={35} height={35} className='rounded-full' />
            ) : null}
            <div>
              <h2 className='font-bold'>{user?.name}</h2>
              <h2 className='text-sm text-gray-400'>{user?.orderId ? 'VIP' : 'Miễn Phí'}</h2>
            </div>
          </div>
        </DropdownMenuTrigger>
        {/* Day la dropdow se xổ ra */}
        <DropdownMenuContent>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* click vao set cai nay thành true */}
          <DropdownMenuItem className='cursor-pointer' onClick={() => setOpenProfile(true)}>
            <UserCircle2 /> Thông tin
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
            <LogOut /> Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
          {/* Mở profile khi  la true */}
      <ProFile openDialog={openProfile} setOpenDialog={setOpenProfile} />
    </div>
  )
}

export default CaNhanHoaList;
