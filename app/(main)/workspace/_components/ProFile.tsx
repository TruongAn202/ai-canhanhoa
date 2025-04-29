import React, { useContext, useEffect, useState } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { XacThucContext } from '@/context/XacThucContext'
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { WalletIcon } from 'lucide-react';


function ProFile({ openDialog, setOpenDialog }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(XacThucContext);
    const [maxToken, setMaxToken] = useState<number>(0);
    useEffect(() => {
        if (user?.orderId) {
            setMaxToken(500000)
        } else {
            setMaxToken(10000) //neu khong co orderId thi token mac dinh 10000
        }
    }, [user])
    return (
        // onOpenChange={setOpenDialog} để dùng cho nút X thoát hoạt động
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{ }</DialogTitle>
                    <DialogDescription asChild>
                        <div>
                            {/* Start thông tin gmail */}
                            <div className='flex gap-4 items-center'>
                                <Image src={user?.picture} alt='user' width={150} height={150}
                                    className='w-[55px] h-[55px] rounded-full'
                                />
                                <div>
                                    <h2 className='font-bold text-lg'>{user?.name}</h2>
                                    <h2 className='text-gray-500'>{user?.email}</h2>
                                </div>
                            </div>
                            <hr className='my-3' />
                            {/* Start thông tin gói hiện tại*/}
                            <div className='flex flex-col gap-2 m-3'>
                                <h2 className='font-bold'>Điểm khả dụng</h2>
                                <h2>{user?.credits}/{maxToken}</h2>
                                <Progress value={user?.credits / maxToken * 100} />
                                <h2 className='flex justify-between font-bold text-lg'>Gói hiện tại
                                    <span className='p-1 bg-gray-100 rounded-md font-normal'>{user?.orderId ? 'Cao cấp' : 'Miễn phí'}</span>
                                </h2>
                            </div>
                            {/* Start thông gói nâng cấp */}
                            <div className='p-4 border rounded-xl'>
                                <div className='flex justify-between'>
                                    <div>
                                        <h2 className='font-bold text-lg'>Gói cao cấp</h2>
                                        <h2>500,000 điểm</h2>
                                    </div>
                                    <h2 className='font-bold text-lg'>200k</h2>
                                </div>
                                <hr className='my-3' />
                                <Button
                                    className="w-full cursor-pointer"
                                    disabled={isLoading} //trang thai loading
                                    onClick={async () => {
                                        if (!user || !user._id) {
                                            alert('Bạn cần đăng nhập trước khi nâng cấp.');
                                            return;
                                        }

                                        setIsLoading(true);
                                        try {
                                            const res = await fetch('/api/payment', { //goi api momo
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ userId: user._id }),//truyen id user
                                            });

                                            const data = await res.json();

                                            if (data?.payUrl) {
                                                window.location.href = data.payUrl;
                                            } else {
                                                alert('Không thể tạo thanh toán. Vui lòng thử lại!');
                                            }
                                        } catch (error) {
                                            console.error('Lỗi tạo thanh toán:', error);
                                            alert('Đã xảy ra lỗi khi kết nối đến MoMo.');
                                        } finally {
                                            setIsLoading(false);
                                        }
                                    }}
                                >
                                    {isLoading ? 'Đang xử lý...' : <><WalletIcon className="mr-2" /> Nâng cấp (200k)</>}
                                </Button>
                            </div>
                            {/* <div className='mt-5 flex justify-end'>
                                <DialogClose asChild>
                                    <Button variant={'secondary'}>Thoát</Button>
                                </DialogClose>
                            </div> */}
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default ProFile