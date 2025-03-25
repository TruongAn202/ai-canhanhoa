"use client"
import React, { useContext, useState } from 'react'
import TrangThaiChatTrong from './TrangThaiChatTrong'
import { CaNhanHoaContext } from '@/context/CaNhanHoaContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

function ChatUi() {
  const [input, setInput]=useState<string>();
  const onSendMessage=()=>{

  }
  return (
    <div className='mt-20 p-7 relative h-[88vh]' >
        <TrangThaiChatTrong/>
        <div className='flex justify-between p-5 gap-5 absolute bottom-5 w-[94%]'>
          <Input placeholder='Bắt đầu chat...'
            onChange={(event)=>setInput(event.target.value)}
            onKeyPress={(e)=>e.key=='Enter' && onSendMessage()}
          />
          <Button>
            <Send/>
          </Button>
        </div>
    </div>
  )
}

export default ChatUi