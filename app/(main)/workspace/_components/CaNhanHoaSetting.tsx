"use client";
import { CaNhanHoaContext } from "@/context/CaNhanHoaContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import aiModels from "@/services/AiModeOption";
import AiModeOption from "@/services/AiModeOption";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { format } from "date-fns"; //cai thu vien de format ngay thang nam
import { vi } from "date-fns/locale"; // Import locale tiếng Việt
import ConfirmationAlert from "../ConfirmationAlert";
import { BlurFade } from "@/components/magicui/blur-fade";

function CaNhanHoaSetting() {
  //khai bao ngay thang nam theo formart
  const now = new Date();
  const formattedDate = format(now, "EEEE, dd MMMM yyyy 'lúc' HH:mm", { locale: vi });

  const { canhanhoa, setCaNhanHoa } = useContext(CaNhanHoaContext); //khi click bao 1 AI ben trai thi khung setting ben phải moi hiện lên
  const CapNhatCaNhanHoa=useMutation(api.userAiCaNhanHoa.CapNhatUserAiCaNhanHoa);
  const XoaCaNhanHoa=useMutation(api.userAiCaNhanHoa.XoaCaNhanHoa); //khai bao de dung ham xoa convex
  const [loading,setLoading]=useState(false);
  const onHandleInputChange=(field:string,value:string)=>{ //bat cu tahy doi nao ở instruction(nguoi dùng thay đổi) thì test area cua ai do cung thay doi
    setCaNhanHoa((prev:any)=>({
      ...prev,[field]:value
    }))
  }
  const OnSave=async()=>{ //nut luu, phai chon 1 model ai truoc khi them userinstruction, ko la se loi
    setLoading(true)
    
    const result=await CapNhatCaNhanHoa({
      id:canhanhoa?._id,
      aiModelId:canhanhoa?.aiModelId,
      userInstruction:canhanhoa?.userInstruction
    })
    toast("Đã lưu", {
      description: <span className="text-gray-500 dark:text-gray-300">{formattedDate}</span>,
    });
    setLoading(false);
  }
  const OnDelete=async()=>{
    console.log('OnDelete');
    setLoading(true)
    await XoaCaNhanHoa({
      id:canhanhoa?._id
    })
    setCaNhanHoa(null);
    setLoading(false);
  }
  return (
    canhanhoa && (
      <div className="p-5 bg-secondary border-l-[1px] h-screen">
        <h2 className="font-bold text-xl">Cài đặt</h2>
        {/* start ảnh và thông tin ai */}
        <BlurFade delay={0.25}> 
        <div className="mt-4 flex gap-3">
          <Image
            src={canhanhoa?.image}
            alt="canhanhoa"
            width={95}
            height={95}
            className="rounded-xl h-[75px] w-[75px]"
          />
          <div>
            <h2 className="font-bold">{canhanhoa?.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">{canhanhoa?.title}</p>
          </div>
        </div>
        </BlurFade>
        {/* end ảnh và thông tin ai */}
        {/* start select chọn mô hình ai */}
        <BlurFade delay={0.25*2}>
        <div className="mt-4">
            <h2 className="text-gray-500">Chọn mô hình AI:</h2>
            <Select defaultValue={canhanhoa.aiModelId} onValueChange={(value)=>onHandleInputChange('aiModelId',value)}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Lựa chọn AI" />
              </SelectTrigger>
              <SelectContent>
                {AiModeOption.map((model,index)=>(
                  <SelectItem key={index} value={model.name}>
                    <div className="flex gap-2 items-center m-1">
                      <Image src={model.logo} alt={model.name} width={20} height={20}
                        className="rounded-md"
                      />
                      <h2>{model.name}</h2>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          </BlurFade>
          {/* end select chọn mô hình ai */}
          {/* start textarea chỉ dẫn ai */}
          <BlurFade delay={0.25*3}>
          <div className="mt-4">
            <h2 className="text-gray-500">Chỉ dẫn AI</h2>
            <Textarea placeholder="Thêm hướng dẫn cho AI" value={canhanhoa?.userInstruction}
            className="h-[180px] bg-white"
            onChange={(e)=>onHandleInputChange('userInstruction',e.target.value)}
            />
          </div>
          </BlurFade>
          {/* end textarea chỉ dẫn ai */}
          <div className="absolute bottom-10 right-5 flex gap-5">
            <ConfirmationAlert OnDelete={OnDelete}>
            <Button className="cursor-pointer" disabled={loading} variant="ghost" > <Trash/> Xóa</Button>
            </ConfirmationAlert>
            <Button className="cursor-pointer" onClick={OnSave} disabled={loading}> {loading?<Loader2Icon className=" animate-spin"/> : <Save/> }Lưu</Button>
          </div>
      </div>
    )
  );
}

export default CaNhanHoaSetting;
