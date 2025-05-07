"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import TrangThaiChatTrong from './TrangThaiChatTrong'
import { CaNhanHoaContext } from '@/context/CaNhanHoaContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2Icon, Send } from 'lucide-react';
import AiModeOption from '@/services/AiModeOption';
import axios from 'axios';
import Image from 'next/image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { XacThucContext } from '@/context/XacThucContext';
import { UpdateTokens } from '@/convex/users';
import { CANHANHOA } from '../../ai-canhanhoa/page';
//chat o giua
type MESSAGE = { //khai bao kieu du lieu neu ko setMessages sẽ bi loi
  role: string, //xac dinh role nay cua ai hoac user
  content: string
}

function ChatUi() {
  const [loading, setLoading] = useState(false); //trang thai loading khi đang gửi mess cho AI
  const chatRef = useRef<any>(null); //Ref để điều khiển scroll khung chat tự động trượt xuống cuối khi có tin nhắn mới.
  const { canhanhoa, setCaNhanHoa } = useContext(CaNhanHoaContext) //Lấy thông tin AI cá nhân hóa đang chọn (tên, instruction, model...).
  const [input, setInput] = useState<string>(''); // luu noi dung nguoi dung đang gõ
  const [messages, setMessages] = useState<MESSAGE[]>([]); // mảng này chứa toan bo tin nhắn tu user và AI
  const { user, setUser } = useContext(XacThucContext); // lay thong tin nguoi dung dang đăng nhập
  const UpdateTokens = useMutation(api.users.UpdateTokens); //sử dụng hàm đã tạo ở convex, trừ token sau moi lan chat

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight //đoạn chat quá dài, chat tiếp sẽ tự cuộn xuống chat mới chất
    }
  }, [messages])//chay khi message thay doi

  useEffect(() => { // clear lich su chat khi nguoi dung chọn AI khác
    setMessages([]);
  }, [canhanhoa?.id])//chay khi id cua ai thay doi

  const onSendMessage = async () => {
    setLoading(true) // hien thi trang thai dang xu ly
    setMessages(prev => [...prev,//prev => [...]là giá trị hiện tại của messages, và trả về một mảng mới đã được cập nhật....prev: Giữ lại tất cả tin nhắn cũ.
    {
      role: 'user',//them tin nhan moi tu inout ng dung
      content: input
    },
    {
      role: 'canhanhoa',//he thong dang xu ly
      content: 'Xin chờ...'
    }
    ])
    const userInput = input; // luu lai input cua user
    setInput(''); // cleaer input
    //Gửi request đến API để gọi AI trả lời
    const AiModel = AiModeOption.find(item => item.name == canhanhoa.aiModelId);
    const fullPrompt = `${canhanhoa?.instruction}\n${canhanhoa?.userInstruction}\n${userInput}`;//lay ca 3 chi dan ban dau, chi den user, va input
    const result = await axios.post('/api/eden-ai-model', {//gui den eden ai
      provider: AiModel?.edenAI,
      userInput: fullPrompt,
      aiResp: messages[messages?.length - 1]?.content //lay do dai tru 1, message index nay la phan hoi cua AI
    });
    setLoading(false); //dung load
    setMessages(prev => prev.slice(0, -1)) // xóa dòng xin chờ của ai(cắt mảng messages bỏ phần tử cuối cùng) prev là messages trước đó.
    setMessages(prev => [...prev, result.data]) // cau tra loi lay tu api cua eden ai
    updateUserToken(result.data?.content) //tru token
  }
  //   Dùng regex /\s+/ để tách chuỗi thành mảng các từ bằng dấu cách (space), tab, hoặc newline.Ví dụ: "Hello world" → ["Hello", "world"]
  // .length: Đếm số phần tử trong mảng, tức là số lượng từ.Nếu resp là null, undefined, hoặc chỉ chứa khoảng trắng → tokenCount = 0.
  const updateUserToken = async (resp: string) => {
    const tokenCount = resp && resp.trim() ? resp.trim().split(/\s+/).length : 0 // neu hop le thi tach chuoi thanh cac tu ngan cach = khoang trang
    console.log(tokenCount);
    //update user token
    const result = await UpdateTokens({ //Gửi yêu cầu UpdateTokens({ credits: 90, uid: "user123" }) lên server.
      credits: user?.credits - tokenCount,
      uid: user?._id
    });
    setUser((prev: CANHANHOA) => ({//State của user được cập nhật ngay lập tức thành { ...prev, credits: 90 }.
      ...prev,
      credits: user?.credits - tokenCount,//Dù chưa có phản hồi từ server, cập nhật credits trong local state để giao diện phản hồi tức thì.
    }));
    console.log(result);
  }

  return (
    canhanhoa ? (
      <div className='mt-20 p-7 relative h-[88vh]'>
        {/* Neu ko co tin nhan nao, hien thi cac goi da setup sẵn */}
        {messages?.length == 0 && <TrangThaiChatTrong />}
        {/* cuon chat khi qua dai */}
        <div className='h-[73vh] overflow-scroll scrollbar-hidden' ref={chatRef}>
          {messages.map((msg, index) => (
            //neu role la user thi ben phai, ai thi ben trai
            <div key={index} className={`flex mb-2 ${msg.role == 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className='flex gap-3'>
                {msg.role == 'canhanhoa' && (
                  <Image src={canhanhoa?.image} alt='canhanhoa'
                    width={100}
                    height={100}
                    className='w-[30px] h-[30px] rounded-full object-cover'
                  />
                )}
                {/* loadding = true thi ad dang tra loi, hien thi icon loading, msg.content hien thi noi dung tin nhan */}
                <div className={`p-3 rounded-lg flex gap-2 ${msg.role == 'user' ? "bg-gray-200 text-black" : "bg-gray-50 text-black"}`}>
                  {loading && messages?.length - 1 == index && <Loader2Icon className='animate-spin' />}
                  <h2>{msg.content}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[94%]'>
          <Input placeholder='Bắt đầu chat...'
          //khung input chat cua ng dung
            value={input}
            disabled={loading || user?.credits <= 0}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={(e) => e.key == 'Enter' && onSendMessage()}
          />
          {/* neu dang loading hoac toekn la 0 thi tat button nay */}
          <Button disabled={loading || user?.credits <= 0} onClick={onSendMessage}
            className={`${loading || user?.credits <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <Send />
          </Button>
        </div>
      </div>
    ) : (
      <div className="mt-20 p-7 h-[88vh] flex items-center justify-center text-gray-500 text-lg">
        Vui lòng chọn một AI cá nhân hóa để bắt đầu trò chuyện bạn nhé.
      </div>
    )
  );
}

export default ChatUi