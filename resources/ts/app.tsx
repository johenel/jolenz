import React, { useState } from 'react';
import { createRoot } from 'react-dom/client'
import Login from './login'
import Register from './register';

const App = () => {
    const [page, setPage] = useState<'login' | 'register'>('login'); // used to switch pages

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Laravel + React + TypeScript 🚀</h1>
            
            {page === 'login' && <Login onSwitchToRegister={() => setPage('register')} />}
            {page === 'register' && <Register />}
        </div>
    )
}

const container = document.getElementById('app')

if (container) {
    createRoot(container).render(<App />)
}
