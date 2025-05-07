import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import các component Popover từ thư mục UI
import AICaNhanHoaList from "@/services/AICaNhanHoaList";//danh sach option AI tao san
import Image from "next/image";

function CaNhanHoaAvatar({children, selectedImage}:any) {
  return (//thu vien ui, click vao avatar sổ ra nhiều avatar
    <Popover> 
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        <div className="grid grid-cols-5 gap-2">
            {AICaNhanHoaList.map((canhanhoa, index)=>(//Lặp qua danh sách AI cá nhân hoá
                <Image src={canhanhoa.image} alt={canhanhoa.name}// Đường dẫn ảnh đại diện,// Thuộc tính alt để mô tả ảnh
                key={index}// Key duy nhất cho mỗi ảnh trong danh sách
                width={80}
                height={80}
                className="w-[30px] h-[30px] rounded-lg object-cover"// CSS Tailwind: ảnh vuông, bo góc, che phủ vừa khít
                onClick={()=>selectedImage(canhanhoa.image)} // Khi click ảnh, gọi hàm selectedImage để cập nhật ảnh đã chọn
                />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CaNhanHoaAvatar;
