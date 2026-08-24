import { getFactoryData } from '@/lib/googleSheets';
import InteractiveDashboard from '@/components/InteractiveDashboard';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Dashboard() {
  // 1. Get the current logged-in user session
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role || 'user'; // Default to 'user' for safety

  // 2. Fetch Data
  const { financials, production } = await getFactoryData();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">OVERVIEW</h1>
          <p className="text-gray-500 font-medium">Real-time factory performance metrics</p>
        </div>
        <div className="text-right">
          <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide shadow-sm border border-green-200">
            ● System Online
          </span>
        </div>
      </div>
      
      {/* Main Interactive Dashboard with User Role */}
      <InteractiveDashboard initialFinancials={financials} initialProduction={production} role={userRole} />
    </div>
  );
}