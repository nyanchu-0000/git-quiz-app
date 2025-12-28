import React from "react";

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
};

const Button: React.FC<ButtonProps> = ({
    onClick,
    children,
    className = "",
}) => (
    <button
        onClick={onClick}
        className={`px-12 py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 shadow-2xl ${className}`}
    >
        {children}
    </button>
);

type ResultProps = {
    score: number;
    totalQuestions: number;
    onRestart: () => void;
};

const Result: React.FC<ResultProps> = ({
    score,
    totalQuestions,
    onRestart,
}) => {
    const percentage = Math.round((score / totalQuestions) * 100);

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

            {/* メインコンテンツ */}
            <div className="relative z-10 flex flex-col items-center max-w-2xl w-full px-6 text-center">
                {/* ヘッダーラベル */}
                <span className="text-xs font-black tracking-[0.3em] uppercase text-zinc-400 mb-2">
                    QUIZ COMPLETED
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-16 tracking-tight">
                    結果発表
                </h2>

                {/* スコア表示（グラスモーフィズム風） */}
                <div className="relative mb-12 group">
                    <div className="flex items-baseline justify-center gap-2 relative z-10">
                        <span className="text-[120px] md:text-[160px] font-black leading-none bg-gradient-to-b from-zinc-800 to-zinc-400 bg-clip-text text-transparent drop-shadow-sm">
                            {score}
                        </span>
                        <span className="text-3xl md:text-4xl font-bold text-zinc-300">
                            / {totalQuestions}
                        </span>
                    </div>

                    {/* 正解率バッジ */}
                    <div className="mt-4 inline-block px-6 py-2 bg-white/80 backdrop-blur-md border border-zinc-100 rounded-full shadow-sm">
                        <span className="text-sm font-bold text-zinc-400">
                            正解率 {percentage}%
                        </span>
                    </div>
                </div>

                {/* プログレスバー */}
                <div className="w-full max-w-md mb-16 flex items-center gap-4">
                    <div className="flex-1 h-3 bg-zinc-200/50 rounded-full overflow-hidden p-[2px] backdrop-blur-sm border border-white">
                        <div
                            className="h-full bg-gradient-to-r from-zinc-400 to-zinc-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <span className="text-sm font-black text-zinc-400 w-10 text-left">
                        {percentage}%
                    </span>
                </div>

                {/* メッセージ */}
                <p className="mb-16 text-zinc-500 text-lg md:text-xl font-medium leading-relaxed">
                    お疲れ様でした！
                    <br />
                    今回のスコアはいかがでしたか？
                </p>

                {/* アクションボタン */}
                <div className="relative group">
                    {/* ボタンの影の演出 */}
                    <div className="absolute inset-0 bg-black blur-2xl opacity-20 group-hover:opacity-30 transition-opacity rounded-2xl" />

                    <Button
                        onClick={onRestart}
                        className="relative bg-black text-white hover:bg-zinc-800 text-xl tracking-wider py-5 px-16 overflow-hidden"
                    >
                        <span className="relative z-10">もう一度挑戦する</span>
                        {/* ボタン内の微かな光沢 */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Result;
