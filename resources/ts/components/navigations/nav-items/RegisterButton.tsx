import { useEffect, useRef, useState } from 'react'
import { useNavigationStore } from '@/stores/navigationStore'

export default function RegisterButton() {
    const [open, setOpen] = useState(false)
    const [animate, setAnimate] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    const toggleAuth = useNavigationStore((s) => s.toggleAuth)

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
                className="px-4 py-2 rounded-full border border-gray-300 text-sm hover:bg-gray-100 transition"
            >
                Register
            </button>

            {open && (
                <div
                    className={`absolute right-0 mt-3 w-72 bg-white rounded-xl shadow-lg p-4 transition-all duration-200 ${
                        animate
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                    }`}
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            toggleAuth() // TEMP
                            setAnimate(false)
                            setTimeout(() => setOpen(false), 200)
                        }}
                        className="space-y-3"
                    >
                        <div>
                            <label className="flex justify-start items-center gap-3 text-xs text-gray-500">Name</label>
                            <input
                                type="email"
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="flex justify-start items-center gap-3 text-xs text-gray-500">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="flex justify-start items-center gap-3 text-xs text-gray-500">
                                Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="flex justify-start items-center gap-3 text-xs text-gray-500">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                required
                                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <span>Already have an account?</span>
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                            >
                                Login
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}