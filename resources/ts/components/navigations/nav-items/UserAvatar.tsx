import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'

export default function UserAvatar() {
    const [open, setOpen] = useState(false)
    const [animate, setAnimate] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()
    const logout = useAuthStore((s) => s.logout)

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setAnimate(false)
                setTimeout(() => setOpen(false), 200)
            }
        }

        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Trigger animation on open
    useEffect(() => {
        if (open) {
            requestAnimationFrame(() => setAnimate(true))
        }
    }, [open])

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => {
                    if (!open) {
                        setOpen(true)
                    } else {
                        setAnimate(false)
                        setTimeout(() => setOpen(false), 200)
                    }
                }}
                className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold hover:ring-2 hover:ring-black transition"
            >
                U
            </button>

            {open && (
                <div
                    className={`absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-200 ${
                        animate
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                    }`}
                >
                    <DropdownItem
                        label="Profile"
                        onClick={() => {
                            navigate('/profile')
                            close(setOpen, setAnimate)
                        }}
                    />
                    <DropdownItem
                        label="Account Settings"
                        onClick={() => {
                            navigate('/settings')
                            close(setOpen, setAnimate)
                        }}
                    />
                    <div className="border-t">
                        <DropdownItem
                            label="Logout"
                            danger
                            onClick={() => {
                                logout()
                                close(setOpen, setAnimate)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

/* ---------------- Helpers ---------------- */

function DropdownItem({
                          label,
                          onClick,
                          danger,
                      }: {
    label: string
    onClick: () => void
    danger?: boolean
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                danger ? 'text-red-600' : 'text-gray-700'
            }`}
        >
            {label}
        </button>
    )
}

function close(
    setOpen: (v: boolean) => void,
    setAnimate: (v: boolean) => void
) {
    setAnimate(false)
    setTimeout(() => setOpen(false), 200)
}
