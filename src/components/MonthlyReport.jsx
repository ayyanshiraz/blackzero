'use client';

import { useState } from 'react';

export default function MonthlyReport({ financials, production }) {
  const [expandedMonth, setExpandedMonth] = useState(null);

  const allMonths = new Set();
  financials.forEach(f => { if(f.isoDate) allMonths.add(f.isoDate.substring(0, 7)) });
  production.forEach(p => { if(p.isoDate) allMonths.add(p.isoDate.substring(0, 7)) });
  
  const sortedMonths = Array.from(allMonths).sort().reverse();

  const toggleMonth = (month) => {
    if (expandedMonth === month) setExpandedMonth(null); 
    else setExpandedMonth(month); 
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-black">
            <tr>
              <th className="px-6 py-4 font-black tracking-wider">Month / Date</th>
              <th className="px-6 py-4 text-right font-bold tracking-wider">Bought (Kg)</th>
              <th className="px-6 py-4 text-right font-bold tracking-wider">Used (Kg)</th>
              <th className="px-6 py-4 text-right font-bold tracking-wider">Produced (Kg)</th>
              <th className="px-6 py-4 text-right font-bold tracking-wider">Waste (Kg)</th>
              <th className="px-6 py-4 text-right font-bold tracking-wider">Sold (Kg)</th>
              {/* NET VALUE REMOVED */}
              <th className="px-4 py-4 text-center font-bold tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedMonths.map((month) => (
              <MonthRow 
                key={month} 
                month={month} 
                financials={financials} 
                production={production} 
                isExpanded={expandedMonth === month}
                onToggle={() => toggleMonth(month)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MonthRow({ month, financials, production, isExpanded, onToggle }) {
  const monthFin = financials.filter(f => f.isoDate && f.isoDate.startsWith(month));
  const monthProd = production.filter(p => p.isoDate && p.isoDate.startsWith(month));

  const totals = {
    boughtKg: monthFin.reduce((sum, item) => sum + item.boughtKg, 0),
    usedKg: monthProd.reduce((sum, item) => sum + item.input, 0),
    producedKg: monthProd.reduce((sum, item) => sum + item.output, 0),
    wasteKg: monthProd.reduce((sum, item) => sum + item.totalWaste, 0),
    soldKg: monthFin.reduce((sum, item) => sum + item.soldKg, 0),
  };

  const [y, m] = month.split('-');
  const dateObj = new Date(y, m - 1);
  const monthName = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <>
      <tr onClick={onToggle} className={`border-b cursor-pointer transition-colors ${isExpanded ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
        <td className="px-6 py-4 font-black text-gray-900 flex items-center gap-3">
          <span className={`transform transition-transform text-xs ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
          {monthName}
        </td>
        <td className="px-6 py-4 text-right font-bold text-blue-700">{totals.boughtKg.toLocaleString()}</td>
        <td className="px-6 py-4 text-right font-bold text-purple-700">{totals.usedKg.toLocaleString()}</td>
        <td className="px-6 py-4 text-right font-bold text-green-700">{totals.producedKg.toLocaleString()}</td>
        <td className="px-6 py-4 text-right font-bold text-red-700">{totals.wasteKg.toLocaleString()}</td>
        <td className="px-6 py-4 text-right font-bold text-emerald-700">{totals.soldKg.toLocaleString()}</td>
        {/* NET VALUE REMOVED */}
        <td className="px-4 py-4 text-center text-xs font-bold text-gray-400 uppercase tracking-wide">
          {isExpanded ? 'Collapse' : 'Expand'}
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="7" className="p-0 border-b border-gray-300">
            <DailyDetailsTable month={month} monthFin={monthFin} monthProd={monthProd} />
          </td>
        </tr>
      )}
    </>
  );
}

function DailyDetailsTable({ month, monthFin, monthProd }) {
  const allDays = new Set();
  monthFin.forEach(f => allDays.add(f.isoDate));
  monthProd.forEach(p => allDays.add(p.isoDate));
  
  const sortedDays = Array.from(allDays).sort();

  if (sortedDays.length === 0) return <div className="p-4 text-center text-gray-500 bg-gray-50 font-medium">No daily data available.</div>;

  return (
    <div className="bg-gray-50 p-6 shadow-inner">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-gray-200 text-gray-700 uppercase font-black tracking-wide border-b border-gray-300">
            <tr>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Bought</th>
              <th className="px-6 py-3 text-right">Used</th>
              <th className="px-6 py-3 text-right">Produced</th>
              <th className="px-6 py-3 text-right">Waste</th>
              <th className="px-6 py-3 text-right">Sold</th>
              {/* NET VALUE REMOVED */}
            </tr>
          </thead>
          <tbody>
            {sortedDays.map(day => {
              const dayFin = monthFin.filter(f => f.isoDate === day);
              const dayProd = monthProd.filter(p => p.isoDate === day);

              const dTotals = {
                bought: dayFin.reduce((s, i) => s + i.boughtKg, 0),
                used: dayProd.reduce((s, i) => s + i.input, 0),
                prod: dayProd.reduce((s, i) => s + i.output, 0),
                waste: dayProd.reduce((s, i) => s + i.totalWaste, 0),
                sold: dayFin.reduce((s, i) => s + i.soldKg, 0),
              };

              return (
                <tr key={day} className="border-b last:border-0 hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-3 font-bold text-gray-800">{day}</td>
                  <td className="px-6 py-3 text-right font-medium text-gray-600">{dTotals.bought > 0 ? dTotals.bought.toLocaleString() : '-'}</td>
                  <td className="px-6 py-3 text-right font-medium text-gray-600">{dTotals.used > 0 ? dTotals.used.toLocaleString() : '-'}</td>
                  <td className="px-6 py-3 text-right font-medium text-gray-600">{dTotals.prod > 0 ? dTotals.prod.toLocaleString() : '-'}</td>
                  <td className="px-6 py-3 text-right font-bold text-red-400">{dTotals.waste > 0 ? dTotals.waste.toLocaleString() : '-'}</td>
                  <td className="px-6 py-3 text-right font-medium text-gray-600">{dTotals.sold > 0 ? dTotals.sold.toLocaleString() : '-'}</td>
                  {/* NET VALUE REMOVED */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}