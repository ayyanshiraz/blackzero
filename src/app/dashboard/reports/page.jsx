import { getFactoryData } from '@/lib/googleSheets';
import MonthlyReport from '@/components/MonthlyReport';

export default async function ReportsPage() {
  const { financials, production } = await getFactoryData();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">MONTHLY REPORTS</h1>
        <p className="text-gray-500 font-medium">Detailed monthly and daily ledgers.</p>
      </div>
      
      {/* The Expandable Table Component */}
      <MonthlyReport financials={financials} production={production} />
    </div>
  );
}