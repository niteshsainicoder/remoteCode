'use client'
import { useTheme } from '@/Context/themecontext';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Tooltip } from "@nextui-org/tooltip";
interface TerminalProps {
    title: string;
    data: string;
    time: number;
    error: string;
    isOpen: boolean;
    loading: boolean;
    serverRunning: boolean
    setServerRunning: React.Dispatch<React.SetStateAction<boolean>>
    onToggle: () => void; // Callback to toggle the state
    classname: string;
}

const Terminal: React.FC<TerminalProps> = ({ title, data, isOpen, time = 0.0, error, onToggle, loading, classname, setServerRunning, serverRunning }) => {
    const { theme } = useTheme();
    const [Time, setTime] = useState<string>('')
    const servercheck = async () => {
        const url = process.env.NEXT_PUBLIC_SERVER_URL!;
 
        try {
            const response = await axios.get(url,{timeout: 90000})
            if (response.status == 200) {
                setServerRunning(true);

            }
        }

        catch (error) {
            console.log(error,"this is error")
        }

    }
    const datatime = (time: number) => {
        // If the time is less than 1 second, convert to milliseconds
        if (time < 1) {
            return `${Math.floor(time * 1000) / 1000} ms`;
        } else {
            return `${Math.floor(time * 100) / 100} s`;
        }
    }



    useEffect(() => {
        servercheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        setTime(datatime(time))
    }, [time])


    // Open terminal when new data arrives and terminal is not already open
    useEffect(() => {

        onToggle(); // Only toggle if terminal is currently closed

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`w-full min-w-fit relative flex border flex-col max-w-full ${classname} max-h-[460px]  sticky top-0 z-10 bottom-0  `}>

            <p
                onClick={onToggle}
                className='w-full h-10  cursor-pointer font-bold antialiased text-center pt-2   flex  justify-between px-9 items-center'
            >
                {title}
                <sup className={`w-2 absolute left-28  top-3 rounded-full h-2 ${serverRunning ? 'bg-green-500' : 'bg-red-500'}`}>
                    <Tooltip
                        className='rounded-lg'
                        showArrow
                        placement="right"
                        content={serverRunning ? 'Server Running' : 'Server Not Running'}
                        classNames={{
                            base: [
                                // arrow color
                                `{ "before:bg-neutral-200 dark:before:bg-white"  ${theme == 'vs-dark' ? 'bg-stone-400' : ' bg-neutral-900'}}`,
                            ],
                            content: [
                                "py-[6px] px-4 shadow-xl  rounded-md ",
                                "text-gray-800 bg-gradient-to-br from-white to-neutral-400",
                            ],
                        }}
                    >
                        <span className='text-transparent'>a</span>
                    </Tooltip>
                </sup>
                <span
                    className={`inline-block ml-2 text-xl transform transition  ${isOpen ? 'rotate-180  pt-3' : 'rotate-0 pt-1'}`}
                >
                    &#94;
                </span>
            </p>

            <div
                className={`transition-max-height duration-300 ease-in-out px-3 ${theme == 'vs-dark' ? `bg-neutral-800 text-neutral-200` : `bg-zinc-200 text-neutral-900`} remove-scrollbar font-mono border-none overflow-y-scroll ${isOpen ? 'max-h-[450px] min-h-[250px] pb-12 pt-2' : 'max-h-0 p-0'
                    }`}
            >
                <div className='w-full text-right pr-5 h-4'>{`${Time} `}</div>
                <div className={`w-full h-full max-h-full min-h-[350px] p-4 mt-4 rounded-lg ${theme == 'vs-dark' ? `bg-neutral-900 ` : ' bg-neutral-400 '} py-10 box-border   `}>
                    {loading ? <p className=' w-full h-full flex items-center justify-center'>Loading <span className='blinking-dot'></span><span className='blinking-dot transition delay-100'></span></p> :
                        <pre className={`w-full h-fit whitespace-pre-wrap break-words ${error ? 'text-red-500' : ' text-grey-300'} `}>
                            {data
                                ? `${serverRunning ? data : 'Server Not Running'} `
                                : error
                                && `${error}`}
                            <span className="blinking-cursor"></span>
                        </pre>}
                </div>
            </div>



        </div>
    );
};

export default Terminal;
