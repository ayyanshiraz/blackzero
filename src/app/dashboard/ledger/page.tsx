import { Suspense } from 'react';
import { getFactoryData } from '@/lib/googleSheets';
import DetailedLedger from '@/components/DetailedLedger';

export default async function LedgerPage() {
  const { financials, production } = await getFactoryData();

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">DETAILED LEDGER</h1>
        <p className="text-gray-500 font-medium">Line-by-line breakdown to verify dashboard calculations.</p>
      </div>
      
      {/* Suspense is required when using URL Search Parameters in Next.js */}
      <Suspense fallback={<div className="p-10 text-center font-bold text-gray-500">Loading ledger data...</div>}>
        <DetailedLedger financials={financials} production={production} />
      </Suspense>
    </div>
  );
}