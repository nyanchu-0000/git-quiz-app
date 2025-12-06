import React, { type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    ...props
}) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};
