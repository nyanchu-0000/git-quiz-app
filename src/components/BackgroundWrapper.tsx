import React from "react";

export const BackgroundWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-[#f8faff] overflow-hidden font-sans">
            {/* 背景装飾：幾何学的なライン（SVG） */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="100"
                            height="100"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 100 0 L 0 0 0 100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path
                        d="M0,100 L1000,800 M-200,500 L800,-100 M600,1200 L1400,200"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                    />
                </svg>
            </div>

            {/* 背景装飾：ぼかした円形グラデーション */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-200 rounded-full blur-[120px] opacity-50" />

            {/* コンテンツエリア */}
            <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col items-center justify-center p-6">
                {children}
            </div>
        </div>
    );
};

