'use client';
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white flex flex-col fixed h-full z-20 shadow-xl">
        {/* BRANDING */}
        <div className="p-6 border-b border-gray-800 bg-gray-900">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-lg">🏭</div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white leading-tight">TECKNORA</h1>
              <p className="text-xs font-bold text-blue-500 tracking-widest uppercase">Factory</p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarItem href="/dashboard" icon="📊" label="Overview" active={pathname === '/dashboard'} />
          <SidebarItem href="/dashboard/reports" icon="📑" label="Monthly Reports" active={pathname === '/dashboard/reports'} />
          <SidebarItem href="/dashboard/ledger" icon="📋" label="Ledger Details" active={pathname === '/dashboard/ledger'} />
        </nav>

        {/* LOGOUT BUTTON */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <div className="mb-4 px-2">
            <p className="text-xs text-gray-500 font-bold uppercase">Logged in as</p>
            <p className="text-sm font-bold text-white">Admin User</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/login' })} 
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2">
            <span>🔒</span> LOGOUT
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

function SidebarItem({ href, icon, label, active }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border ${active ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'border-transparent text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
      <span className="text-lg">{icon}</span>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </Link>
  );
}