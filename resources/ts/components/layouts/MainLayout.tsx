import React from "react";
import FloatingNav from "@/components/navigations/FloatingNav";

interface MainLayoutProps {
    children?: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className={`flex flex-col`}>
            <FloatingNav></FloatingNav>
            <div className={`p-10 mt-[7%] max-w-[80%] m-auto w-full`}>
                {children}
            </div>
        </div>
    );
}
