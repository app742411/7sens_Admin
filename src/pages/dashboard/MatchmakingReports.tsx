import { Users, Star, Activity, AlertCircle, FileText, Download, Share2 } from 'lucide-react';

const STATS = [
  { label: 'Mutual Yes Matches', value: '14', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { label: 'Average Compatibility', value: '72%', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Unmatched Participants', value: '2', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Total Completed Dates', value: '48', icon: Users, color: 'text-green-500', bg: 'bg-green-50' },
];

export const MatchmakingReports = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#1B2A4A]">Matchmaking & Event Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Analytics and connection data for Sunset Rooftop Party.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert('Exporting full analytics report as PDF...')}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-none hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2"
          >
            <Download size={16} /> Export Report
          </button>
          <button 
            onClick={() => alert('Share link copied to clipboard!')}
            className="px-4 py-2 bg-[#1B2A4A] text-white font-medium rounded-none hover:bg-opacity-90 transition-colors shadow-sm flex items-center gap-2"
          >
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 flex items-center justify-center rounded-none ${stat.bg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="font-semibold text-[var(--color-navy)] text-lg">Top Compatibility Rankings</h2>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Rank</th>
                  <th className="px-6 py-4 font-semibold">Pairing</th>
                  <th className="px-6 py-4 font-semibold">S7 Connection™</th>
                  <th className="px-6 py-4 font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { rank: 1, pair: 'Alice M. & Bob T.', score: '92%', outcome: 'Mutual Yes' },
                  { rank: 2, pair: 'Sarah K. & John D.', score: '88%', outcome: 'Mutual Yes' },
                  { rank: 3, pair: 'Diana R. & Mark S.', score: '85%', outcome: 'Yes / Maybe' },
                  { rank: 4, pair: 'Eve S. & Frank L.', score: '81%', outcome: 'Mutual Maybe' },
                  { rank: 5, pair: 'Grace H. & Tom B.', score: '79%', outcome: 'No / Yes' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 text-gray-500 font-medium">#{row.rank}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.pair}</td>
                    <td className="px-6 py-4 font-bold text-[#C9A84C]">{row.score}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold uppercase ${
                        row.outcome === 'Mutual Yes' ? 'text-green-700 bg-green-50' : 
                        row.outcome.includes('Maybe') ? 'text-yellow-700 bg-yellow-50' : 
                        'text-gray-600 bg-gray-100'
                      }`}>
                        {row.outcome}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-[var(--color-navy)]">Feedback Breakdown</h2>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Yes</span>
                  <span className="font-bold">45%</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="bg-green-500 h-2" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Maybe</span>
                  <span className="font-bold">30%</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="bg-yellow-500 h-2" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">No</span>
                  <span className="font-bold">25%</span>
                </div>
                <div className="w-full bg-gray-100 h-2">
                  <div className="bg-gray-400 h-2" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="font-semibold text-[var(--color-navy)] flex items-center gap-2">
                <FileText size={16} className="text-[#C9A84C]" />
                Rotation Change Log
              </h2>
            </div>
            <div className="p-6 flex flex-col gap-4 max-h-[250px] overflow-y-auto text-sm">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                <p className="text-gray-600"><span className="font-medium text-gray-900">Admin</span> regenerated rotation for Round 3.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
                <p className="text-gray-600"><span className="font-medium text-gray-900">System</span> auto-adjusted Round 2 due to late arrival (Charlie K.).</p>
              </div>
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                <p className="text-gray-600"><span className="font-medium text-gray-900">Admin</span> skipped Round 5.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
