"use client"
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { XacThucContext } from "@/context/XacThucContext";
import { api } from "@/convex/_generated/api";
import AICaNhanHoaList from "@/services/AICaNhanHoaList";
import { useConvex, useMutation } from "convex/react";
import { Loader, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; //bat buoc phai la navigation
import React, { useContext, useEffect, useState } from "react";

export type CANHANHOA ={
      id: number,
      name: string,
      title: string,
      image: string, //neu co anh thi luu vao public va de duong dan đó
      instruction: string,
      userInstruction: string,
      sampleQuestions: string[],
      aiModelId?:string
}

function AICaNhanHoa() {
  const [selectedAICaNhanHoa,setSelectedAICaNhanHoa]=useState<CANHANHOA[]>([]); //trang thai
  const insertCaNhanHoa=useMutation(api.userAiCaNhanHoa.InsertSelectedCaNhanHoa); // khai bao de dùng ở onclicktieptuc
  const {user, isLoadingUser}=useContext(XacThucContext);//khai bao de co uid dung o onclicktieptuc
  const [loading,setLoading] = useState(false);

  const convex = useConvex(); //khao bao de dung convex.query
  const router=useRouter(); //khai bao de dung chuyen trang

  // Khi `user` thay đổi, nếu có user, thì gọi hàm `GetUserCaNhanHoa()`
  useEffect(() => { //lien quan den provider,xacthuccontext
    if (isLoadingUser) return; //Đợi tới khi load xong user
  
    if (!user) {
      router.replace('/sign-in'); //Không có user thì mới redirect
      return;
    }
  
    GetUserCaNhanHoa(); //Chỉ gọi khi có user hợp lệ
  }, [user, isLoadingUser]);
// Hàm này lấy danh sách người dùng cá nhân hóa từ Convex
const GetUserCaNhanHoa = async () => {
  const result = await convex.query(api.userAiCaNhanHoa.GetAllUserCaNhanHoa, {
      uid: user._id, // Truy vấn dữ liệu dựa trên ID người dùng
  });
  console.log(result);
  // Nếu đã có dữ liệu cá nhân hóa cho user, chuyển hướng đến `/workspace`
  if (result.length > 0) {
      router.replace('/workspace');
      return;
  }
};
// Xử lý sự kiện khi người dùng chọn một mục cá nhân hóa
const onSelect = (canhanhoa: CANHANHOA) => {
  // Kiểm tra xem mục đã được chọn chưa
  const item =
      selectedAICaNhanHoa &&
      selectedAICaNhanHoa.find((item: CANHANHOA) => item.id == canhanhoa.id);
  if (item) {
      // Nếu mục đã chọn, thì xóa khỏi danh sách
      setSelectedAICaNhanHoa(
          selectedAICaNhanHoa.filter((item: CANHANHOA) => item.id !== canhanhoa.id)
      );
      return;
  }
  // Nếu chưa chọn, thêm mục vào danh sách
  setSelectedAICaNhanHoa((prev) => [...prev, canhanhoa]);
};
// Kiểm tra xem một mục có đang được chọn hay không
const IsCaNhanHoaSelected = (canhanhoa: CANHANHOA) => {
  const item =
      selectedAICaNhanHoa &&
      selectedAICaNhanHoa.find((item: CANHANHOA) => item.id == canhanhoa.id);
  return item ? true : false;
};

// Xử lý sự kiện khi nhấn nút "Tiếp tục"
const OnClickTiepTuc = async () => {
  setLoading(true); // Hiển thị trạng thái loading trong khi chờ xử lý
  // Gửi danh sách các mục cá nhân hóa đã chọn lên server
  const result = await insertCaNhanHoa({
      records: selectedAICaNhanHoa,
      uid: user?._id, // Lưu theo ID người dùng
  });
  setLoading(false); // Tắt trạng thái loading sau khi xử lý xong
  console.log(result);
  router.push('/workspace');
};

  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div> 
        <BlurFade delay={0.25*1*0.05} inView>
          <h2 className="text-3xl font-bold">Chào mừng bạn đến với trình cá nhân hóa AI của chúng tôi</h2>
        </BlurFade>
        <BlurFade delay={0.25 * 2} inView>
          <p className="text-xl mt-2">Hãy chọn AI của bạn</p>
        </BlurFade>
        </div>
        <ShimmerButton disabled={selectedAICaNhanHoa?.length==0 || loading} shimmerDuration="8s" className="shadow-2xl" onClick={OnClickTiepTuc}>
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {loading&&<Loader2Icon className="animate-spin"/>}Tiếp tục
          </span>
        </ShimmerButton> 
      </div>
      <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AICaNhanHoaList.map((canhanhoa,index)=>(
          // thu vien magic ui, hien thi danh sach AI mượt hơn
          <BlurFade key={canhanhoa.image} delay={0.25 + index * 0.05} inView>
          {/* phai co id neu ko se loi, neu loi conclick thi sua o next.config.ts vi cau hinh cu khong cho */}
          <div key={canhanhoa.id || index} className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative" onClick={()=>onSelect(canhanhoa)}> 
            <Checkbox className="absolute mt-2 ml-2" checked={IsCaNhanHoaSelected(canhanhoa)}/>
            <Image src={canhanhoa.image} alt={canhanhoa.title}
              width={600}
              height={600}
              className="rounded-xl w-full h-[200px] opject-cover"
            />
            <h2 className="text-center font-bold text-lg">{canhanhoa.name}</h2>
            <h2 className="text-center text-gray-600 dark:text-gray-300">{canhanhoa.title}</h2>
          </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}

export default AICaNhanHoa;
