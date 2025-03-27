import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AICaNhanHoaList from "@/services/AICaNhanHoaList";
import Image from "next/image";

function CaNhanHoaAvatar({children, selectedImage}:any) {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
            {AICaNhanHoaList.map((canhanhoa, index)=>(
                <Image src={canhanhoa.image} alt={canhanhoa.name}
                key={index}
                width={80}
                height={80}
                className="w-[30px] h-[30px] rounded-lg object-cover"
                onClick={()=>selectedImage(canhanhoa.image)}
                />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CaNhanHoaAvatar;
