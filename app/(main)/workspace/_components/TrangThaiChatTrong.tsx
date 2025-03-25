import { BlurFade } from '@/components/magicui/blur-fade';
import { SparklesText } from '@/components/magicui/sparkles-text';
import { CaNhanHoaContext } from '@/context/CaNhanHoaContext';
import { ChevronsRight } from 'lucide-react';
import React, { useContext } from 'react';

function TrangThaiChatTrong() {
    const { canhanhoa } = useContext(CaNhanHoaContext);

    return (
        <div className='flex flex-col items-center'>
            <SparklesText className='text-4xl text-center font-bold' text='Tôi có thể giúp gì cho bạn?' />
            <div className='mt-7 flex flex-col gap-3 w-full max-w-lg'>
                {canhanhoa?.sampleQuestions.map((suggestion: string, index: number) => (
                    <BlurFade key={index} delay={0.25*index}>
                    <div 
                        key={index} 
                        className='p-4 text-lg border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition text-center flex items-center justify-between'>
                        {suggestion}
                        <ChevronsRight/>
                    </div>
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}

export default TrangThaiChatTrong;
