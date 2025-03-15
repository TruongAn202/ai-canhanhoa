import React from 'react'
import CaNhanHoaList from './_components/CaNhanHoaList'

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
                CHAT UI
            </div>
            <div className='hidden lg:block'>
                CÀI ĐẶT
                {/* setting */}
            </div>
        </div>
    </div>
  )
}

export default Workspace