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

type MESSAGE={ //khai bao kieu du lieu neu ko setMessages sẽ bi loi
  role:string,
  content:string
}

function ChatUi() {
  const [loading, setLoading]=useState(false);
  const chatRef=useRef<any>(null);
  const {canhanhoa, setCaNhanHoa}=useContext(CaNhanHoaContext)
  const [input, setInput]=useState<string>('');
  const [messages, setMessages]=useState<MESSAGE[]>([]);
  const {user, setUser} = useContext(XacThucContext);
  const UpdateTokens=useMutation(api.users.UpdateTokens); //sử dụng hàm đã tạo ở convex

  useEffect(()=>{
    if(chatRef.current){
      chatRef.current.scrollTop = chatRef.current.scrollHeight //đoạn chat quá dài, chat tiếp sẽ tự cuộn xuống chat mới chất
    }
  }, [messages])

  useEffect(()=>{
    setMessages([]);
  },[canhanhoa?.id])

  const onSendMessage= async()=>{
    setLoading(true)
    setMessages(prev=>[...prev,
      {
        role:'user',
        content:input
      },
      {
        role:'canhanhoa',
        content:'Xin chờ...'
      }
    ])
    const userInput=input;
    setInput('');
    const AiModel=AiModeOption.find(item=>item.name==canhanhoa.aiModelId);
    const result= await axios.post('/api/eden-ai-model',{
      provider:AiModel?.edenAI,
      userInput:userInput + ":" + canhanhoa?.instruction + ":" + canhanhoa.userInstruction,
      aiResp:messages[messages?.length-1]?.content
    });
    setLoading(false);
    setMessages(prev=>prev.slice(0,-1))
    setMessages(prev=>[...prev,result.data])
    updateUserToken(result.data?.content)
    
  }
//   Dùng regex /\s+/ để tách chuỗi thành mảng các từ bằng dấu cách (space), tab, hoặc newline.Ví dụ: "Hello world" → ["Hello", "world"]
// .length: Đếm số phần tử trong mảng, tức là số lượng từ.Nếu resp là null, undefined, hoặc chỉ chứa khoảng trắng → tokenCount = 0.
  const updateUserToken=async(resp:string)=>{
    const tokenCount=resp&&resp.trim()?resp.trim().split(/\s+/).length:0
    console.log(tokenCount);
    //update user token
    const result = await UpdateTokens({ //Gửi yêu cầu UpdateTokens({ credits: 90, uid: "user123" }) lên server.
      credits:user?.credits-tokenCount,
      uid:user?._id
    });
    setUser((prev:CANHANHOA)=>({//State của user được cập nhật ngay lập tức thành { ...prev, credits: 90 }.
      ...prev,
      credits:user?.credits-tokenCount,
    }));
    console.log(result);
  }

  return (
    <div className='mt-20 p-7 relative h-[88vh]' >
         {messages?.length == 0 && <TrangThaiChatTrong/>}
         {/* có đồng thời h-[75vh] overflow-scroll thì mới có thể làm chiều cao cố định và cuộn các nội dung trong đó */}
         <div className='h-[73vh] overflow-scroll scrollbar-hidden' ref={chatRef}>
          {messages.map((msg,index)=>(
            <div key={index} className={`flex mb-2 ${msg.role=='user'?'justify-end':'justify-start'}`}>
              <div className='flex gap-3'>
                {/* neu la AI ca nhan hoa tra loi se co avatar */}
                {msg.role=='canhanhoa' && <Image src={canhanhoa?.image} alt='canhanhoa'
                  width={100}
                  height={100}
                  className='w-[30px] h-[30px] rounded-full object-cover'
                />}
                <div className={`p-3 rounded-lg flex gap-2 ${msg.role=='user'?"bg-gray-200 text-black rounded-lg":"bg-gray-50 text-black"}`}>
                  {loading&& messages?.length-1 == index &&<Loader2Icon className='animate-spin'/>}
                  <h2>{msg.content}</h2> 
                </div>
              </div>
            </div>
          ))}
         </div>
        <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[94%]'>
          <Input placeholder='Bắt đầu chat...'
            value={input}
            disabled={loading || user?.credits<=0}
            onChange={(event)=>setInput(event.target.value)}
            onKeyPress={(e)=>e.key=='Enter' && onSendMessage()}
          />
          {/* xóa khung chat khi AI danng loading trả lời */}
          <Button disabled={loading || user?.credits<=0} onClick={onSendMessage}
          className={`${loading || user?.credits <= 0 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          >
            <Send/>
          </Button>
        </div>
    </div>
  )
}

export default ChatUi