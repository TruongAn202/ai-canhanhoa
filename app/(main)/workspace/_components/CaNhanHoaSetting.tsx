"use client";
import { CaNhanHoaContext } from "@/context/CaNhanHoaContext";
import Image from "next/image";
import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import aiModels from "@/services/AiModeOption";
import AiModeOption from "@/services/AiModeOption";

function CaNhanHoaSetting() {
  const { canhanhoa, setCaNhanHoa } = useContext(CaNhanHoaContext); //khi click bao 1 AI ben trai thi khung setting ben phải moi hiện lên
  return (
    canhanhoa && (
      <div className="p-5 bg-secondary border-l-[1px] h-screen">
        <h2 className="font-bold text-xl">Cài đặt</h2>
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
        <div className="mt-4">
            <h2>Chọn mô hình AI:</h2>
            <Select>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Lựa chọn AI" />
              </SelectTrigger>
              <SelectContent>
                {AiModeOption.map((model,index)=>(
                  <SelectItem value={model.name}>
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
      </div>
    )
  );
}

export default CaNhanHoaSetting;
