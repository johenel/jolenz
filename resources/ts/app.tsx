import React from 'react'
import { createRoot } from 'react-dom/client'
import { router } from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import Modal from '@/components/utils/Modal';

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
}

const container = document.getElementById('app')

if (container) {
    createRoot(container).render(
        <React.StrictMode>
            <AppInitializer>
                <RouterProvider router={router}></RouterProvider>
                <Modal></Modal>
            </AppInitializer>
        </React.StrictMode>
    );
}
