'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- CUSTOM ITEM SORTING SEQUENCE ---
const ITEM_SEQUENCE = [
  'PP-1', 'PP-2', 'NATURAL', 'SILVER', 'WHITE', 'RED', 'GREEN', 
  'BLUE', 'ORANGE', 'BLACK', 'BEIGE', 'YELLOW', 'CALPIT'
];

export default function InteractiveDashboard({ initialFinancials, initialProduction, role }) {
  const router = useRouter();

  // State Initialization
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedItem, setSelectedItem] = useState('All');
  const [selectedVendor, setSelectedVendor] = useState('All');
  const [selectedCustomer, setSelectedCustomer] = useState('All');

  // --- STATE PERSISTENCE (Sticky Filters) ---
  useEffect(() => {
    const saved = sessionStorage.getItem('dashboardFilters');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.dateRange) setDateRange(parsed.dateRange);
        if (parsed.selectedItem) setSelectedItem(parsed.selectedItem);
        if (parsed.selectedVendor) setSelectedVendor(parsed.selectedVendor);
        if (parsed.selectedCustomer) setSelectedCustomer(parsed.selectedCustomer);
      } catch (e) { console.error('Could not parse saved filters'); }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('dashboardFilters', JSON.stringify({
      dateRange, selectedItem, selectedVendor, selectedCustomer
    }));
  }, [dateRange, selectedItem, selectedVendor, selectedCustomer]);


  // --- DYNAMIC DROPDOWN LISTS ---
  const allItems = [...new Set(initialFinancials.map(i => i.itemName))].sort((a, b) => {
    const aIndex = ITEM_SEQUENCE.findIndex(item => a.toUpperCase().includes(item));
    const bIndex = ITEM_SEQUENCE.findIndex(item => b.toUpperCase().includes(item));
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  const allVendors = [...new Set(initialFinancials
    .filter(i => i.type && i.type.toLowerCase().includes('purchase'))
    .map(i => i.partyName)
  )].filter(Boolean).sort();

  const allCustomers = [...new Set(initialFinancials
    .filter(i => i.type && i.type.toLowerCase().includes('sale'))
    .map(i => i.partyName)
  )].filter(Boolean).sort();


  // --- FILTERING LOGIC ---
  const filteredFinancials = useMemo(() => {
    return initialFinancials.filter(item => {
      // DATE FILTER
      if (dateRange.start && item.isoDate < dateRange.start) return false;
      if (dateRange.end && item.isoDate > dateRange.end) return false;

      // ITEM FILTER
      if (selectedItem !== 'All' && item.itemName !== selectedItem) return false;
      
      // VENDOR FILTER
      if (selectedVendor !== 'All') {
        if (!item.type.toLowerCase().includes('purchase')) return false; 
        if (item.partyName !== selectedVendor) return false;
      }

      // CUSTOMER FILTER
      if (selectedCustomer !== 'All') {
        if (!item.type.toLowerCase().includes('sale')) return false;
        if (item.partyName !== selectedCustomer) return false;
      }

      return true;
    });
  }, [initialFinancials, dateRange, selectedItem, selectedVendor, selectedCustomer]);

  const filteredProduction = initialProduction.filter(item => {
    if (dateRange.start && item.isoDate < dateRange.start) return false;
    if (dateRange.end && item.isoDate > dateRange.end) return false;
    return true;
  });

  // --- MATH ---
  const totals = filteredFinancials.reduce((acc, curr) => ({
    salesVal: acc.salesVal + curr.credit,
    buyVal: acc.buyVal + curr.debit,
    soldKg: acc.soldKg + curr.soldKg,     
    boughtKg: acc.boughtKg + curr.boughtKg 
  }), { salesVal: 0, buyVal: 0, soldKg: 0, boughtKg: 0 });

  const prodTotals = filteredProduction.reduce((acc, curr) => ({
    usedKg: acc.usedKg + curr.input,        
    producedKg: acc.producedKg + curr.output, 
    totalWaste: acc.totalWaste + curr.totalWaste,
    wasteTapeline: acc.wasteTapeline + curr.wasteTapeline,
    wasteWeaving: acc.wasteWeaving + curr.wasteWeaving,
    wasteFinishing: acc.wasteFinishing + curr.wasteFinishing,
  }), { usedKg: 0, producedKg: 0, totalWaste: 0, wasteTapeline: 0, wasteWeaving: 0, wasteFinishing: 0 });

  const efficiency = prodTotals.usedKg > 0 
    ? ((prodTotals.producedKg / prodTotals.usedKg) * 100).toFixed(1) 
    : 0;

  const chartData = filteredFinancials.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.itemName);
    if (existing) {
      existing.Sales += curr.credit;
      existing.Cost += curr.debit;
    } else if (curr.itemName && (curr.credit > 0 || curr.debit > 0)) {
      acc.push({ name: curr.itemName, Sales: curr.credit, Cost: curr.debit });
    }
    return acc;
  }, []);

  // --- RESET HANDLER ---
  const handleReset = () => {
    setDateRange({start: '', end: ''});
    setSelectedItem('All');
    setSelectedVendor('All');
    setSelectedCustomer('All');
    sessionStorage.removeItem('dashboardFilters'); 
  };

  const inputClass = 'w-full border-2 border-gray-300 p-2.5 rounded-lg bg-gray-50 text-xs text-black font-bold focus:border-black focus:bg-white outline-none transition-all';

  return (
    <div className={'space-y-8 font-sans p-2'}>
      
      {/* --- CONTROL CENTER --- */}
      <div className={'bg-white p-6 rounded-2xl shadow-sm border border-gray-200'}>
        <div className={'flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b pb-4'}>
          <h2 className={'text-lg font-black text-gray-800 uppercase tracking-tight flex items-center gap-2'}>
            🎛️ Control Panel
          </h2>
        </div>

        {/* Filters Grid */}
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end'}>
             
            {/* UNIFIED DATE RANGE CELL */}
            <div className={'lg:col-span-2'}>
              <label className={'text-[10px] font-black text-gray-500 uppercase mb-1.5 block ml-1 tracking-wider'}>Date Range</label>
              <div className={'flex items-center w-full border-2 border-gray-300 rounded-lg bg-gray-50 overflow-hidden focus-within:border-black focus-within:bg-white transition-all'}>
                <input 
                  type={'date'} 
                  className={'w-full p-2.5 bg-transparent text-xs text-black font-bold outline-none cursor-pointer'} 
                  value={dateRange.start} 
                  onChange={e => setDateRange({...dateRange, start: e.target.value})} 
                />
                <span className={'text-gray-400 font-bold px-1 select-none'}>→</span>
                <input 
                  type={'date'} 
                  className={'w-full p-2.5 bg-transparent text-xs text-black font-bold outline-none cursor-pointer'} 
                  value={dateRange.end} 
                  onChange={e => setDateRange({...dateRange, end: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className={'text-[10px] font-black text-gray-500 uppercase mb-1.5 block ml-1 tracking-wider'}>Item Filter</label>
              <select className={inputClass} value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
                <option value={'All'}>All Items</option>
                {allItems.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            
            {/* VENDOR DROPDOWN */}
            <div>
              <label className={'text-[10px] font-black text-rose-500 uppercase mb-1.5 block ml-1 tracking-wider'}>Filter Vendor</label>
              <select className={inputClass} value={selectedVendor} onChange={e => {
                  setSelectedVendor(e.target.value);
                  if(e.target.value !== 'All') setSelectedCustomer('All'); 
                }}>
                <option value={'All'}>All Vendors</option>
                {allVendors.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            {/* CUSTOMER DROPDOWN */}
            <div>
              <label className={'text-[10px] font-black text-emerald-500 uppercase mb-1.5 block ml-1 tracking-wider'}>Filter Customer</label>
              <select className={inputClass} value={selectedCustomer} onChange={e => {
                  setSelectedCustomer(e.target.value);
                  if(e.target.value !== 'All') setSelectedVendor('All'); 
                }}>
                <option value={'All'}>All Customers</option>
                {allCustomers.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          
            <button onClick={handleReset} 
              className={'bg-black text-white hover:bg-gray-800 w-full px-4 py-3 rounded-lg text-xs font-black shadow-lg transition-all active:scale-95 uppercase tracking-widest'}>
              Reset
            </button>
        </div>
      </div>

      {/* --- SECTION 1: ACCOUNTABILITY (Material Flow) --- */}
      <div>
        <h2 className={'text-xl font-black text-black mb-4 flex items-center gap-2 border-b-2 border-gray-100 pb-2'}>
          🏭 MATERIAL ACCOUNTABILITY
        </h2>
        <div className={'grid grid-cols-1 md:grid-cols-5 gap-4'}>
          
          <KPI title={'Raw Material Bought'} val={totals.boughtKg.toLocaleString()} unit={'kg'} color={'blue'} onClick={() => router.push('/dashboard/ledger?tab=bought')} />
          <KPI title={'Material Used'} val={prodTotals.usedKg.toLocaleString()} unit={'kg'} color={'purple'} onClick={() => router.push('/dashboard/ledger?tab=used')} />
          <KPI title={'Finished Goods Sold'} val={totals.soldKg.toLocaleString()} unit={'kg'} color={'green'} onClick={() => router.push('/dashboard/ledger?tab=sold')} />
          <KPI title={'Total Waste'} val={prodTotals.totalWaste.toLocaleString()} unit={'kg'} color={'red'} onClick={() => router.push('/dashboard/ledger?tab=waste')} />
          
          <div className={'p-5 rounded-xl border-l-4 shadow-sm border border-gray-100 bg-gray-900 border-l-gray-700 text-white'}>
            <h3 className={'text-[10px] font-black uppercase opacity-70 tracking-widest'}>Prod. Efficiency</h3>
            <div className={'mt-2 flex items-baseline gap-1'}>
              <span className={`text-3xl font-black ${efficiency > 90 ? 'text-green-400' : efficiency > 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                {efficiency}%
              </span>
            </div>
            <p className={'text-[10px] text-gray-400 mt-1 font-medium'}>Output vs Input Ratio</p>
          </div>
        </div>
      </div>

      {/* --- SECTION 2: WASTE BREAKDOWN --- */}
      <div className={'grid grid-cols-1 md:grid-cols-3 gap-6'}>
        <WasteCard title={'Tapeline Waste'} val={prodTotals.wasteTapeline} color={'red'} />
        <WasteCard title={'Weaving Waste'} val={prodTotals.wasteWeaving} color={'orange'} />
        <WasteCard title={'Finishing Waste'} val={prodTotals.wasteFinishing} color={'yellow'} />
      </div>

      {/* --- SECTION 3: CHARTS & FINANCIALS --- */}
      <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
        
        {/* ONLY RENDER IF USER IS ADMIN */}
        {role === 'admin' && (
          <div className={'lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4'}>
             <div className={'bg-emerald-50 p-6 rounded-2xl border border-emerald-100 flex justify-between items-center'}>
                <div>
                  <p className={'text-xs font-black text-emerald-800 uppercase tracking-widest mb-1'}>Total Sales Revenue</p>
                  <p className={'text-3xl font-black text-emerald-900'}>Rs {totals.salesVal.toLocaleString()}</p>
                </div>
                <div className={'h-12 w-12 bg-emerald-200 rounded-full flex items-center justify-center text-xl'}>💰</div>
             </div>
             <div className={'bg-rose-50 p-6 rounded-2xl border border-rose-100 flex justify-between items-center'}>
                <div>
                  <p className={'text-xs font-black text-rose-800 uppercase tracking-widest mb-1'}>Total Purchase Cost</p>
                  <p className={'text-3xl font-black text-rose-900'}>Rs {totals.buyVal.toLocaleString()}</p>
                </div>
                <div className={'h-12 w-12 bg-rose-200 rounded-full flex items-center justify-center text-xl'}>📉</div>
             </div>
          </div>
        )}

        <div className={'lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200'}>
          <h2 className={'text-sm font-black mb-6 text-black uppercase tracking-wide'}>Production Trends (Daily)</h2>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <AreaChart data={filteredProduction} margin={{top:10, bottom:0, left:-10}}>
                <defs>
                  <linearGradient id={'colorUsed'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                    <stop offset={'5%'} stopColor={'#8b5cf6'} stopOpacity={0.3}/>
                    <stop offset={'95%'} stopColor={'#8b5cf6'} stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id={'colorProd'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                    <stop offset={'5%'} stopColor={'#10b981'} stopOpacity={0.3}/>
                    <stop offset={'95%'} stopColor={'#10b981'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray={'3 3'} vertical={false} stroke={'#f3f4f6'} />
                <XAxis dataKey={'isoDate'} tickFormatter={(str) => str?.substring(8,10)} tick={{fontSize: 10, fontWeight:'bold'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 10, fontWeight:'bold'}} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{borderRadius:'10px', border:'none', boxShadow:'0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign={'top'} iconType={'circle'} wrapperStyle={{paddingBottom:'20px'}} />
                <Area type={'monotone'} dataKey={'input'} stroke={'#8b5cf6'} strokeWidth={3} fill={'url(#colorUsed)'} name={'Used (kg)'} />
                <Area type={'monotone'} dataKey={'output'} stroke={'#10b981'} strokeWidth={3} fill={'url(#colorProd)'} name={'Produced (kg)'} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={'bg-white p-6 rounded-2xl shadow-sm border border-gray-200'}>
          <h2 className={'text-sm font-black mb-6 text-black uppercase tracking-wide'}>Sales By Item</h2>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <BarChart data={chartData} layout={'vertical'} margin={{left:-20}}>
                <CartesianGrid strokeDasharray={'3 3'} horizontal={true} vertical={false} stroke={'#f3f4f6'} />
                <XAxis type={'number'} hide />
                <YAxis dataKey={'name'} type={'category'} width={80} tick={{fontSize: 9, fontWeight:'bold'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius:'8px'}} />
                <Bar dataKey={'Sales'} fill={'#10b981'} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function KPI({ title, val, unit, color, onClick }) {
  const styles = {
    blue: 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100 hover:border-blue-300',
    purple: 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100 hover:border-purple-300',
    green: 'bg-green-50 text-green-900 border-green-200 hover:bg-green-100 hover:border-green-300',
    red: 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100 hover:border-red-300',
  };
  
  return (
    <div 
      onClick={onClick}
      className={`p-5 rounded-xl border shadow-sm transition-all duration-200 ${styles[color]} ${onClick ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md' : ''}`}>
      <h3 className={'text-[10px] font-black uppercase opacity-70 tracking-widest'}>{title}</h3>
      <div className={'mt-2 flex items-baseline gap-1'}>
        <span className={'text-2xl font-black tracking-tight'}>{val}</span>
        {unit && <span className={'text-[10px] font-bold opacity-70'}>{unit}</span>}
      </div>
    </div>
  );
}

function WasteCard({ title, val, color }) {
  const styles = {
    red: 'from-red-50 to-white border-red-100 text-red-800',
    orange: 'from-orange-50 to-white border-orange-100 text-orange-800',
    yellow: 'from-yellow-50 to-white border-yellow-100 text-yellow-800',
  };
  return (
    <div className={`p-4 rounded-xl border bg-gradient-to-br ${styles[color]} shadow-sm`}>
      <div className={'flex justify-between items-start'}>
        <div>
          <h3 className={'text-xs font-black uppercase tracking-wide opacity-80'}>{title}</h3>
          <p className={'text-2xl font-black mt-1'}>{val.toLocaleString()}</p>
        </div>
        <span className={'text-xs font-bold bg-white px-2 py-1 rounded-md shadow-sm opacity-80'}>kg</span>
      </div>
    </div>
  );
}