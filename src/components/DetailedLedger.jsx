'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const ITEM_SEQUENCE = [
  'PP-1', 'PP-2', 'NATURAL', 'SILVER', 'WHITE', 'RED', 'GREEN', 
  'BLUE', 'ORANGE', 'BLACK', 'BEIGE', 'YELLOW', 'CALPIT'
];

export default function DetailedLedger({ financials, production }) {
  const searchParams = useSearchParams();
  const incomingTab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState('bought');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedItem, setSelectedItem] = useState('All');
  const [selectedParty, setSelectedParty] = useState('All');

  // Listen for clicks from the main dashboard
  useEffect(() => {
    if (incomingTab && ['bought', 'used', 'sold', 'waste'].includes(incomingTab)) {
      setActiveTab(incomingTab);
    }
  }, [incomingTab]);

  // Reset dropdowns if you switch tabs (so you don't search for a vendor in the Sales tab)
  useEffect(() => {
    setSelectedParty('All');
  }, [activeTab]);

  // --- DYNAMIC DROPDOWNS ---
  const allItems = [...new Set(financials.map(i => i.itemName))].sort((a, b) => {
    const aIndex = ITEM_SEQUENCE.findIndex(item => a.toUpperCase().includes(item));
    const bIndex = ITEM_SEQUENCE.findIndex(item => b.toUpperCase().includes(item));
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  const allVendors = [...new Set(financials.filter(i => i.type.toLowerCase().includes('purchase')).map(i => i.partyName))].filter(Boolean).sort();
  const allCustomers = [...new Set(financials.filter(i => i.type.toLowerCase().includes('sale')).map(i => i.partyName))].filter(Boolean).sort();

  // --- FILTERING ---
  const filteredFin = useMemo(() => financials.filter(item => {
    if (dateRange.start && item.isoDate < dateRange.start) return false;
    if (dateRange.end && item.isoDate > dateRange.end) return false;
    if (selectedItem !== 'All' && item.itemName !== selectedItem) return false;
    if (selectedParty !== 'All' && item.partyName !== selectedParty) return false;
    return true;
  }), [financials, dateRange, selectedItem, selectedParty]);

  const filteredProd = useMemo(() => production.filter(item => {
    if (dateRange.start && item.isoDate < dateRange.start) return false;
    if (dateRange.end && item.isoDate > dateRange.end) return false;
    return true;
  }), [production, dateRange]);

  // --- CATEGORIZE DATA ---
  const dataMap = {
    bought: filteredFin.filter(i => i.type.toLowerCase().includes('purchase')),
    sold: filteredFin.filter(i => i.type.toLowerCase().includes('sale')),
    used: filteredProd.filter(i => i.input > 0),
    waste: filteredProd.filter(i => i.totalWaste > 0),
  };

  const getTabTotal = () => {
    if (activeTab === 'bought') return dataMap.bought.reduce((sum, i) => sum + i.boughtKg, 0);
    if (activeTab === 'sold') return dataMap.sold.reduce((sum, i) => sum + i.soldKg, 0);
    if (activeTab === 'used') return dataMap.used.reduce((sum, i) => sum + i.input, 0);
    if (activeTab === 'waste') return dataMap.waste.reduce((sum, i) => sum + i.totalWaste, 0);
    return 0;
  };

  const inputClass = "border-2 border-gray-300 p-2 rounded-lg bg-white text-xs text-black font-bold focus:border-black outline-none transition-all w-full md:w-auto";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden font-sans">
      
      {/* HEADER TABS */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-wrap gap-2">
        <TabButton id="bought" label="Raw Material Bought" active={activeTab} onClick={setActiveTab} />
        <TabButton id="used" label="Material Used" active={activeTab} onClick={setActiveTab} />
        <TabButton id="sold" label="Finished Goods Sold" active={activeTab} onClick={setActiveTab} />
        <TabButton id="waste" label="Waste Generated" active={activeTab} onClick={setActiveTab} />
      </div>

      {/* FILTER BAR */}
      <div className="p-4 border-b border-gray-200 bg-gray-100 flex flex-col md:flex-row items-end gap-4">
        
        {/* Date Filter (Applies to all) */}
        <div>
          <label className="text-[10px] font-black text-gray-500 uppercase mb-1 block ml-1 tracking-wider">Date Range</label>
          <div className="flex items-center w-full border-2 border-gray-300 rounded-lg bg-white overflow-hidden focus-within:border-black transition-all">
            <input type="date" className="w-full p-2 bg-transparent text-xs text-black font-bold outline-none cursor-pointer" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} />
            <span className="text-gray-400 font-bold px-1 select-none">→</span>
            <input type="date" className="w-full p-2 bg-transparent text-xs text-black font-bold outline-none cursor-pointer" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} />
          </div>
        </div>

        {/* Item & Party Filters (Only show on Bought/Sold tabs) */}
        {(activeTab === 'bought' || activeTab === 'sold') && (
          <>
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-1 block ml-1 tracking-wider">Item Filter</label>
              <select className={inputClass} value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
                <option value="All">All Items</option>
                {allItems.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            
            <div>
              <label className="text-[10px] font-black text-gray-500 uppercase mb-1 block ml-1 tracking-wider">
                {activeTab === 'bought' ? 'Vendor Filter' : 'Customer Filter'}
              </label>
              <select className={inputClass} value={selectedParty} onChange={e => setSelectedParty(e.target.value)}>
                <option value="All">All {activeTab === 'bought' ? 'Vendors' : 'Customers'}</option>
                {(activeTab === 'bought' ? allVendors : allCustomers).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </>
        )}

        <button onClick={() => {setDateRange({start:'', end:''}); setSelectedItem('All'); setSelectedParty('All');}} 
          className="bg-black text-white hover:bg-gray-800 px-6 py-2.5 rounded-lg text-xs font-black shadow-md transition-all uppercase tracking-widest ml-auto">
          Reset
        </button>
      </div>

      {/* TOTAL BAR */}
      <div className="bg-blue-50 p-4 border-b border-blue-100 flex justify-between items-center">
        <span className="text-sm font-black text-blue-900 uppercase tracking-widest">Calculated Total for this view:</span>
        <span className="text-2xl font-black text-blue-700">{getTabTotal().toLocaleString()} <span className="text-sm">kg</span></span>
      </div>

      {/* TABLES */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-white uppercase bg-black sticky top-0 z-10">
            {activeTab === 'bought' && (
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4 text-right">Bought Qty (Kg)</th>
                <th className="px-6 py-4 text-right">Cost (Rs)</th>
              </tr>
            )}
            {activeTab === 'sold' && (
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4 text-right">Sold Qty (Kg)</th>
                <th className="px-6 py-4 text-right">Revenue (Rs)</th>
              </tr>
            )}
            {activeTab === 'used' && (
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Input Used (Kg)</th>
                <th className="px-6 py-4 text-right">Output Produced (Kg)</th>
                <th className="px-6 py-4 text-right">Daily Efficiency</th>
              </tr>
            )}
            {activeTab === 'waste' && (
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Tapeline (Kg)</th>
                <th className="px-6 py-4 text-right">Weaving (Kg)</th>
                <th className="px-6 py-4 text-right">Finishing (Kg)</th>
                <th className="px-6 py-4 text-right text-red-300">Total Waste (Kg)</th>
              </tr>
            )}
          </thead>
          <tbody>
            {dataMap[activeTab].length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500 font-bold">No data found for this period.</td></tr>
            ) : (
              dataMap[activeTab].map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-bold text-gray-800">{row.isoDate || 'N/A'}</td>
                  
                  {/* Bought Tab Columns */}
                  {activeTab === 'bought' && <>
                    <td className="px-6 py-3 font-medium text-gray-600">{row.itemName}</td>
                    <td className="px-6 py-3 font-medium text-gray-600">{row.partyName}</td>
                    <td className="px-6 py-3 text-right font-bold text-blue-700">{row.boughtKg?.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-500">Rs {row.debit?.toLocaleString()}</td>
                  </>}

                  {/* Sold Tab Columns */}
                  {activeTab === 'sold' && <>
                    <td className="px-6 py-3 font-medium text-gray-600">{row.itemName}</td>
                    <td className="px-6 py-3 font-medium text-gray-600">{row.partyName}</td>
                    <td className="px-6 py-3 text-right font-bold text-green-700">{row.soldKg?.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-500">Rs {row.credit?.toLocaleString()}</td>
                  </>}

                  {/* Used Tab Columns */}
                  {activeTab === 'used' && <>
                    <td className="px-6 py-3 text-right font-bold text-purple-700">{row.input?.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-bold text-green-600">{row.output?.toLocaleString()}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-500">
                      {row.input > 0 ? ((row.output / row.input) * 100).toFixed(1) + '%' : '-'}
                    </td>
                  </>}

                  {/* Waste Tab Columns */}
                  {activeTab === 'waste' && <>
                    <td className="px-6 py-3 text-right font-medium text-gray-600">{row.wasteTapeline?.toLocaleString() || '-'}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-600">{row.wasteWeaving?.toLocaleString() || '-'}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-600">{row.wasteFinishing?.toLocaleString() || '-'}</td>
                    <td className="px-6 py-3 text-right font-black text-red-600">{row.totalWaste?.toLocaleString()}</td>
                  </>}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabButton({ id, label, active, onClick }) {
  const isActive = active === id;
  return (
    <button 
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-md text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
        isActive ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:text-black hover:bg-gray-200'
      }`}>
      {label}
    </button>
  );
}