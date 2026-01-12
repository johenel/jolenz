import React from 'react';
import {useModalStore} from "@/stores/modalStore";
import {useToastStore} from "@/stores/toastStore";
import MainLayout from "@/components/layouts/MainLayout";

const Home = () => {
    return (
        <MainLayout>
            <div>
                Homepage
            </div>
        </MainLayout>
    );
}

export default Home;
