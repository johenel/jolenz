import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from '@/pages/Home';
import Tournament from "@/pages/Tournament";
import Ranking from "@/pages/Ranking";
import News from "@/pages/News";

export const router = createBrowserRouter([
    { path: '/', element: <Home/> },
    { path: '/tournaments', element: <Tournament/> },
    { path: '/rankings', element: <Ranking/> },
    { path: '/news', element: <News/> },
]);
