"use client"
import { BlurFade } from "@/components/magicui/blur-fade";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AICaNhanHoaList from "@/services/AICaNhanHoaList";
import Image from "next/image";
import React, { useState } from "react";

export type CANHANHOA ={
      id: number,
      name: string,
      title: string,
      image: string, //neu co anh thi luu vao public va de duong dan đó
      instruction: string,
      userInstruction: string,
      sampleQuestions: string[]
}

function AICaNhanHoa() {
  const [selectedAICaNhanHoa,setSelectedAICaNhanHoa]=useState<CANHANHOA[]>([]); //trang thai

  const onSelect=(canhanhoa:CANHANHOA)=>{
    const item = selectedAICaNhanHoa&&selectedAICaNhanHoa.find((item:CANHANHOA)=>item.id==canhanhoa.id);
    if(item){
      setSelectedAICaNhanHoa(selectedAICaNhanHoa.filter((item:CANHANHOA)=>item.id!==canhanhoa.id))
      return ;
    }
    setSelectedAICaNhanHoa(prev=>[...prev, canhanhoa]);
  }
  const IsCaNhanHoaSelected=(canhanhoa:CANHANHOA)=>{
    const item = selectedAICaNhanHoa&&selectedAICaNhanHoa.find((item:CANHANHOA)=>item.id==canhanhoa.id);
    return item?true:false
  }
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
        <ShimmerButton disabled={selectedAICaNhanHoa?.length===0} shimmerDuration="8s" className="shadow-2xl" >
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            Tiếp tục
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
