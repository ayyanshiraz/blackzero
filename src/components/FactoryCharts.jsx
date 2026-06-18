'use client';

import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function FactoryCharts({ financials, production }) {
  
  // Format numbers to "M" (Millions) or "K" (Thousands) for readability
  const formatMoney = (value) => {
    if (value > 1000000) return `Rs ${(value / 1000000).toFixed(1)}M`;
    if (value > 1000) return `Rs ${(value / 1000).toFixed(0)}K`;
    return value;
  };

  return (
    <div className="space-y-8">
      
      {/* CHART 1: FINANCIALS */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">💰 Sales vs Purchase Costs</h2>
        <div style={{ width: '100%', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financials} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                interval={0}
                fontSize={11}
                tick={{fill: '#6b7280'}}
              />
              <YAxis tickFormatter={formatMoney} />
              <Tooltip formatter={(value) => `Rs ${value.toLocaleString()}`} />
              <Legend verticalAlign="top" height={36}/>
              <Bar dataKey="Sales" fill="#10b981" radius={[4, 4, 0, 0]} name="Sales (Inflow)" />
              <Bar dataKey="Cost" fill="#ef4444" radius={[4, 4, 0, 0]} name="Purchase (Outflow)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: PRODUCTION EFFICIENCY */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-gray-800">🏭 Production Volume (Input vs Output)</h2>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={production} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="index" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Tooltip />
              <Legend verticalAlign="top"/>
              <Area type="monotone" dataKey="input" stroke="#3b82f6" fillOpacity={1} fill="url(#colorInput)" name="Raw Material Used" />
              <Area type="monotone" dataKey="output" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorOutput)" name="Finished Goods" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}