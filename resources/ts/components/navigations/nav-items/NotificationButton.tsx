import { FaBell } from 'react-icons/fa6'

export default function NotificationButton() {
    return (
        <button
            className="relative p-3 rounded-full hover:bg-gray-100 transition"
            title="Notifications"
        >
            <FaBell className="text-gray-700" />

            {/* Notification dot */}
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>
    )
}
