import { NavLink, useLocation } from 'react-router-dom'
import {
    FaHouse,
    FaTrophy,
    FaRankingStar,
    FaNewspaper,
    FaMagnifyingGlass,
    FaXmark,
} from 'react-icons/fa6'
import { useNavigationStore } from '@/stores/navigationStore'
import LoginButton from '@/components/navigations/nav-items/LoginButton'
import NotificationButton from '@/components/navigations/nav-items/NotificationButton'
import UserAvatar from '@/components/navigations/nav-items/UserAvatar'
import Register from '@/register'
import RegisterButton from './nav-items/RegisterButton'

type NavItem = {
    name: string
    path: string
    icon: JSX.Element
}

const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: <FaHouse /> },
    { name: 'Tournament', path: '/tournaments', icon: <FaTrophy /> },
    { name: 'Rankings', path: '/rankings', icon: <FaRankingStar /> },
    { name: 'News', path: '/news', icon: <FaNewspaper /> },
]

export default function FloatingNav() {
    const location = useLocation()
    const {
        searchOpen,
        searchQuery,
        openSearch,
        closeSearch,
        setSearchQuery,
        isAuthenticated,
    } = useNavigationStore()

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[80%]">
            <nav className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center justify-between">
                {/* 1️⃣ App Logo + Name */}
                <div className="flex items-center gap-3 font-semibold text-lg">
                    <img src="/assets/images/jolenz_logo.png" width={40} height={40} alt=""/>
                    <span className={'logo-title'}>JolenZ</span>
                </div>

                {/* 2️⃣ Nav Menu (icons only) */}
                <div className="flex items-center gap-2">
                    {!searchOpen &&
                        navItems.map((item) => (
                            <NavIcon
                                key={item.name}
                                item={item}
                                active={location.pathname === item.path}
                            />
                        ))}

                    {!searchOpen && (
                        <IconButton
                            icon={<FaMagnifyingGlass />}
                            label="Search"
                            onClick={openSearch}
                        />
                    )}

                    {searchOpen && (
                        <div className="flex items-center gap-2 w-72">
                            <FaMagnifyingGlass className="text-gray-400" />
                            <input
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 outline-none"
                                placeholder="Search..."
                            />
                            <button onClick={closeSearch}>
                                <FaXmark />
                            </button>
                        </div>
                    )}
                </div>

                {/* 3️⃣ Auth Section */}
                <div className="flex items-center gap-3">
                    {!isAuthenticated && <LoginButton />}
                    {!isAuthenticated && <RegisterButton />}
                    {isAuthenticated && (
                        <>
                            <NotificationButton />
                            <UserAvatar />
                        </>
                    )}
                </div>
            </nav>
        </div>
    )
}

/* ---------------- Helpers ---------------- */

function NavIcon({
                     item,
                     active,
                 }: {
    item: NavItem
    active: boolean
}) {
    return (
        <NavLink to={item.path}>
            <div className="relative group">
                <div
                    className={`p-3 rounded-full transition-all ${
                        active
                            ? 'bg-black text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    {item.icon}
                </div>

                {/* Tooltip */}
                <Tooltip label={item.name} />
            </div>
        </NavLink>
    )
}

function IconButton({
                        icon,
                        label,
                        onClick,
                    }: {
    icon: JSX.Element
    label: string
    onClick: () => void
}) {
    return (
        <div className="relative group">
            <button
                onClick={onClick}
                className="p-3 rounded-full text-gray-600 hover:bg-gray-100 transition"
            >
                {icon}
            </button>
            <Tooltip label={label} />
        </div>
    )
}

function Tooltip({ label }: { label: string }) {
    return (
        <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
            <div className="px-2 py-1 text-xs bg-black text-white rounded whitespace-nowrap">
                {label}
            </div>
        </div>
    )
}
