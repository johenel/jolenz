import React from 'react'
import { createRoot } from 'react-dom/client'

const App = () => {
    return (
        <div style={{ padding: '2rem' }}>
            <h1>Laravel + React + TypeScript 🚀</h1>
        </div>
    )
}

const container = document.getElementById('app')

if (container) {
    createRoot(container).render(<App />)
}
