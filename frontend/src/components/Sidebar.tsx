import { Link } from "react-router";

export function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0 p-6">
            <h2 className="text-xl font-bold mb-6">DeliveryTracker</h2>
            <nav className="flex flex-col gap-4">
                <Link to="/dashboard" className="hover:text-blue-400 cursor-pointer">
                    Dashboard
                </Link>
                <Link to="/deliveries" className="hover:text-blue-400 cursor-pointer">
                    Entregas
                </Link>
                <Link to="/couriers" className="hover:text-blue-400 cursor-pointer">
                    Entregadores
                </Link>
            </nav>
        </aside>
    )
}