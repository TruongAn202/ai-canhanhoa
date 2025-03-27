import React, { useContext, useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AICaNhanHoaList from "@/services/AICaNhanHoaList";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { CANHANHOA } from "../../ai-canhanhoa/page";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModeOption from "@/services/AiModeOption";
import { Textarea } from "@/components/ui/textarea";
import CaNhanHoaAvatar from "./CaNhanHoaAvatar";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { XacThucContext } from "@/context/XacThucContext";
import { CaNhanHoaContext } from "@/context/CaNhanHoaContext";
import { Loader2Icon } from "lucide-react";


const DEFAULT_CANHANHOA = {
    image: "/baomat.png",
    name: "",
    title: "",
    instruction: "",
    id: 0,
    sampleQuestions: [],
    userInstruction: "",
    aiModelId: "",
  }

function ThemMoiCaNhanHoa({ children }: any) {
  //có 1 phần tử con trong nó ví dụ button
  const [selectedCaNhanHoa, setSelectedCaNhanHoa] = useState<CANHANHOA>(DEFAULT_CANHANHOA);
  const AddCaNhanHoa=useMutation(api.userAiCaNhanHoa.InsertSelectedCaNhanHoa);
  const {user}=useContext(XacThucContext);
  const [loading, setLoading] = useState(false);
  const {canhanhoa,setCaNhanHoa}=useContext(CaNhanHoaContext);
  
  const onHandleInputChange = (field: string, value: string) => { 
    // Hàm nhận vào hai tham số:
    // - `field`: tên của thuộc tính trong state cần cập nhật
    // - `value`: giá trị mới cần gán cho thuộc tính đó
    setSelectedCaNhanHoa((prev: any) => ({
      // Gọi hàm `setSelectedCaNhanHoa` để cập nhật state, sử dụng `prev` để lấy giá trị trước đó
      ...prev, // Giữ lại tất cả các thuộc tính cũ trong state
      [field]: value, // Cập nhật thuộc tính có tên `field` với giá trị mới `value`
    }));
}
const onSave=async()=>{
  if(!selectedCaNhanHoa?.name || !selectedCaNhanHoa.title || !selectedCaNhanHoa.userInstruction){
    toast('Bạn chưa điền đủ thông tin cho AI')
    return ;
  }
  setLoading(true)
  const result=await AddCaNhanHoa({
    records:[selectedCaNhanHoa],
    uid:user?._id
  })
  toast('Đã lưu AI thành công');
  setCaNhanHoa(null);
  setLoading(false); 
}


  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm AI Mới</DialogTitle>
          <DialogDescription asChild>
            <div className="grid grid-cols-3 mt-5 gap-5">
              <div className="mt-5 border-r p-3">
                <Button variant={"secondary"} size={"sm"} className="w-full cursor-pointer" onClick={()=>setSelectedCaNhanHoa(DEFAULT_CANHANHOA)}>
                  + Tạo mới AI
                </Button>
                <div className="mb-2">
                  {AICaNhanHoaList.map((canhanhoa, index) => (
                    <div
                      key={index}
                      className=" p-2 hover:bg-secondary flex gap-2 items-center rounded-xl cursor-pointer"
                      onClick={() => setSelectedCaNhanHoa(canhanhoa)}
                    >
                      <Image
                        src={canhanhoa.image}
                        width={60}
                        height={60}
                        alt={canhanhoa.name}
                        className="w-[36px] h-[36px] object-cover rounded-lg"
                      />
                      <p className="text-xs">{canhanhoa.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* start form bên phải */}
              <div className="col-span-2">
                <div className="flex gap-5">
                  {selectedCaNhanHoa && (
                    <CaNhanHoaAvatar selectedImage={(v:string)=>onHandleInputChange('image',v)}>
                    <Image
                      src={selectedCaNhanHoa?.image}
                      alt="canhanhoa"
                      width={100}
                      height={100}
                      className="w-[100ox] h-[100px] rounded-xl cursor-pointer object-cover"
                    />
                    </CaNhanHoaAvatar>
                  ) }
                  <div className=" flex flex-col gap-3 w-full">
                    <Input
                      placeholder="Nhập tên của AI"
                      className="w-full"
                      value={selectedCaNhanHoa?.name}
                      onChange={(event) =>
                        onHandleInputChange("name", event.target.value)
                      }
                    />
                    <Input
                      placeholder="Nhập mô tả của AI"
                      className="w-full"
                      value={selectedCaNhanHoa?.title}
                      onChange={(event) => 
                        onHandleInputChange("title", event.target.value) //truyền prop value={selectedCaNhanHoa?.title} phải có onchange
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-500">Chọn mô hình AI:</h2>
                  <Select
                    defaultValue={selectedCaNhanHoa?.aiModelId}
                    onValueChange={(value) =>
                      onHandleInputChange("aiModelId", value)
                    }
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Lựa chọn AI" />
                    </SelectTrigger>
                    <SelectContent>
                      {AiModeOption.map((model, index) => (
                        <SelectItem key={index} value={model.name}>
                          <div className="flex gap-2 items-center m-1">
                            <Image
                              src={model.logo}
                              alt={model.name}
                              width={20}
                              height={20}
                              className="rounded-md"
                            />
                            <h2>{model.name}</h2>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-5">
                    <p className="text-gray-500">Chỉ dẫn AI</p>
                    <Textarea placeholder="Thêm chỉ dẫn cho AI"
                    value={selectedCaNhanHoa.userInstruction}
                    onChange={(event)=>onHandleInputChange('userInstruction',event.target.value)}
                    className="h-[200px]"
                    />
                </div>
                <div className="flex gap-5 justify-end mt-10">
                  {/* thiết lập hành động thoát cho nút này, asChild để không lỗi button lồng button */}
                    <DialogClose asChild> 
                      <Button className="cursor-pointer" variant={'secondary'}>Thoát</Button>
                    </DialogClose>
                    <Button  disabled={loading} className="cursor-pointer"
                    onClick={onSave}
                    > {loading&&<Loader2Icon className="animate-spin"/>}Lưu</Button>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ThemMoiCaNhanHoa;
