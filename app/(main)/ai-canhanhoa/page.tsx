"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AICaNhanHoaList from "@/services/AICaNhanHoaList";
import Image from "next/image";
import React, { useState } from "react";

function AICaNhanHoa() {
  const [selectedAICaNhanHoa,setSelectedAICaNhanHoa]=useState(); //trang thai

  const onSelect=(canhanhoa:any)=>{
    
  }
  return (
    <div className="px-10 mt-20 md:px-28 lg:px-36 xl:px-48">
      <div className="flex justify-between items-center">
        <div> 
          <h2 className="text-3xl font-bold">Chào mừng bạn đến với trình cá nhân hóa AI của chúng tôi</h2>
          <p className="text-xl mt-2">Hãy chọn AI của bạn</p>
        </div>
        <Button>Tiếp tục</Button>
      </div>
      <div className="grid grid-cols-2 md:gird-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5">
        {AICaNhanHoaList.map((canhanhoa,index)=>(
          //phai co id neu ko se loi, neu loi conclick thi sua o next.config.ts vi cau hinh cu khong cho
          <div key={canhanhoa.id || index} className="hover:border p-3 rounded-xl hover:scale-105 transition-all ease-in-out cursor-pointer relative" onClick={()=>onSelect(canhanhoa)}> 
            <Checkbox className="absolute mt-2 ml-2"/>
            <Image src={canhanhoa.image} alt={canhanhoa.title}
              width={600}
              height={600}
              className="rounded-xl w-full h-[200px] opject-cover"
            />
            <h2 className="text-center font-bold text-lg">{canhanhoa.name}</h2>
            <h2 className="text-center text-gray-600 dark:text-gray-300">{canhanhoa.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AICaNhanHoa;
