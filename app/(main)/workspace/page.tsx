import React from 'react'
import CaNhanHoaList from './_components/CaNhanHoaList'
import CaNhanHoaSetting from './_components/CaNhanHoaSetting'
import ChatUi from './_components/ChatUi'

function Workspace() {
  return (
    <div className='h-screen fixed w-full'>
        <div className='grid grid-cols-5'>
            <div className='hidden md:block'>
                {/* list cac AI trong _components của workspaces */}
                <CaNhanHoaList/>
            </div>
            <div className='col-span-4 lg:col-span-3'>
                {/* chat ui */}
                <ChatUi/>
            </div>
            <div className='hidden lg:block'>
                {/* Tao trong components, roi dua no vao day de hien thi */}
                <CaNhanHoaSetting/> 
            </div>
        </div>
    </div>
  )
}

export default Workspace