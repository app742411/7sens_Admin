import { Play, Pause, SkipForward, Clock, Users, UserX, UserCheck, RefreshCw, Edit, AlertCircle, ArrowRightLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';

const MOCK_ATTENDEES = [
  { id: 1, name: 'Alice M.', status: 'present', table: 1 },
  { id: 2, name: 'Bob T.', status: 'present', table: 1 },
  { id: 3, name: 'Charlie K.', status: 'late', table: null },
  { id: 4, name: 'Diana R.', status: 'absent', table: null },
  { id: 5, name: 'Eve S.', status: 'present', table: 2 },
  { id: 6, name: 'Frank L.', status: 'present', table: 2 },
  { id: 7, name: 'Grace H.', status: 'present', table: 3 },
  { id: 8, name: 'Henry W.', status: 'present', table: 3 },
];

const INITIAL_ROTATION = [
  { table: 1, p1: { name: 'Alice M.', id: 1 }, p2: { name: 'Bob T.', id: 2 }, compatibility: '85%' },
  { table: 2, p1: { name: 'Eve S.', id: 5 }, p2: { name: 'Frank L.', id: 6 }, compatibility: '78%' },
  { table: 3, p1: { name: 'Grace H.', id: 7 }, p2: { name: 'Henry W.', id: 8 }, compatibility: '92%' },
];

export const LiveEventControl = () => {
  const [roundStatus, setRoundStatus] = useState<'waiting' | 'running' | 'paused'>('waiting');
  const [timeLeft, setTimeLeft] = useState('07:00');
  const [currentRound, setCurrentRound] = useState(1);
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const [toast, setToast] = useState<string | null>(null);
  const totalRounds = 7;

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddTable = () => {
    const newTableNum = rotation.length > 0 ? Math.max(...rotation.map(r => r.table)) + 1 : 1;
    setRotation([...rotation, { 
      table: newTableNum, 
      p1: { name: 'Empty Seat', id: 0 }, 
      p2: { name: 'Empty Seat', id: 0 }, 
      compatibility: '-' 
    }]);
  };

  const handleClearTable = (tableNum: number) => {
    setRotation(rotation.map(r => r.table === tableNum ? {
      ...r,
      p1: { name: 'Empty Seat', id: 0 },
      p2: { name: 'Empty Seat', id: 0 },
      compatibility: '-'
    } : r));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto pb-10 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-none shadow-xl z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-5">
          <CheckCircle2 size={18} />
          <span className="font-semibold">{toast}</span>
        </div>
      )}
      
      {/* Header & Global Status */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-100 text-red-600 rounded-full text-xs font-bold tracking-wider uppercase animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Live Control
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-navy)]">Sunset Rooftop Party</h1>
          </div>
          <p className="text-sm text-gray-500 mt-1">Manage rounds, mark attendance, and adjust table rotations on the fly.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Event Progress</span>
            <span className="text-lg font-bold text-[var(--color-navy)]">Round {currentRound} <span className="text-gray-400 text-sm font-medium">/ {totalRounds}</span></span>
          </div>
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to end this event early? This will stop all timers and unmatch remaining participants.')) {
                showToast('Event ended successfully.');
              }
            }}
            className="px-5 py-2.5 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-sm text-sm"
          >
            End Event Early
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column: Timer & Controls (Takes up 4 cols on XL) */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Master Control Deck */}
          <div className="bg-white border border-gray-200 shadow-sm overflow-hidden flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C9A84C] to-yellow-300"></div>
            <div className="p-6 flex flex-col items-center justify-center gap-2 text-center border-b border-gray-50">
              <span className="font-bold text-[#C9A84C] uppercase tracking-wider text-xs">Current Timer</span>
              <div className="text-6xl font-mono font-black text-[var(--color-navy)] tracking-tight my-2">
                {timeLeft}
              </div>
              <span className={clsx(
                "px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full",
                roundStatus === 'running' ? "bg-green-100 text-green-700" :
                roundStatus === 'paused' ? "bg-yellow-100 text-yellow-700" :
                "bg-gray-100 text-gray-600"
              )}>
                {roundStatus === 'running' ? 'In Progress' : roundStatus === 'paused' ? 'Paused' : 'Waiting to Start'}
              </span>
            </div>
            
            <div className="p-4 bg-gray-50 flex flex-col gap-3">
              {roundStatus === 'waiting' || roundStatus === 'paused' ? (
                <button 
                  onClick={() => setRoundStatus('running')}
                  className="w-full py-4 bg-green-600 text-white font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-sm text-lg"
                >
                  <Play size={20} />
                  Start Round {currentRound}
                </button>
              ) : (
                <button 
                  onClick={() => setRoundStatus('paused')}
                  className="w-full py-4 bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 shadow-sm text-lg"
                >
                  <Pause size={20} />
                  Pause Timer
                </button>
              )}
              
              <div className="flex gap-3">
                <button 
                  onClick={() => showToast('+1 Minute added to current round timer.')}
                  className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <Clock size={16} />
                  +1 Min
                </button>
                <button 
                  onClick={() => {
                    if (currentRound < totalRounds) setCurrentRound(prev => prev + 1);
                    setRoundStatus('waiting');
                    setTimeLeft('07:00');
                    showToast('Skipped to next round.');
                  }}
                  className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  <SkipForward size={16} />
                  Skip Round
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Panel */}
          <div className="bg-white border border-gray-200 shadow-sm flex flex-col flex-1">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="font-semibold text-[var(--color-navy)] flex items-center gap-2">
                <Users size={18} className="text-[#C9A84C]" />
                Live Attendance
              </h2>
              <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                6/8 Present
              </span>
            </div>
            
            <div className="p-0 flex-1 overflow-y-auto max-h-[400px]">
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-gray-50">
                  {MOCK_ATTENDEES.map(a => (
                    <tr key={a.id} className="hover:bg-gray-50 group transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-900">{a.name}</span>
                          {a.table && <span className="text-xs text-gray-500">Table {a.table}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={clsx(
                          "px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none",
                          a.status === 'present' ? "text-green-700 bg-green-50 border border-green-100" : 
                          a.status === 'late' ? "text-orange-700 bg-orange-50 border border-orange-100" : 
                          "text-red-700 bg-red-50 border border-red-100"
                        )}>
                          {a.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right opacity-0 group-hover:opacity-100 transition-opacity w-24">
                        <div className="flex justify-end gap-1">
                          <button className="p-1.5 bg-white border border-gray-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-colors" title="Mark Present"><UserCheck size={14} /></button>
                          <button className="p-1.5 bg-white border border-gray-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors" title="Mark Absent"><UserX size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Table Rotation Manager (Takes up 8 cols on XL) */}
        <div className="xl:col-span-8 bg-white border border-gray-200 shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
            <div className="flex flex-col">
              <h2 className="font-semibold text-[var(--color-navy)] text-lg flex items-center gap-2">
                Table Assignments: Round {currentRound}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Optimized by S7 Connection™ engine.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => showToast('Select two tables to swap seats.')}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <ArrowRightLeft size={16} />
                Swap Seats
              </button>
              <button 
                onClick={() => showToast('Rotations regenerated based on latest S7 scores!')}
                className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
              >
                <RefreshCw size={16} />
                Regenerate Focus
              </button>
              <button 
                onClick={() => showToast(`Round ${currentRound} schedule has been published to all participant devices!`)}
                className="px-4 py-2 bg-[#C9A84C] text-white text-sm font-semibold hover:bg-[#b5953e] transition-colors flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 size={16} />
                Publish to Users
              </button>
            </div>
          </div>

          {/* Table Grid */}
          <div className="p-6 flex-1 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {rotation.map(r => (
                <div key={r.table} className="bg-white border border-gray-200 shadow-sm hover:border-[#C9A84C]/50 transition-colors relative overflow-hidden group">
                  {/* Table Header */}
                  <div className="bg-[var(--color-navy)] text-white px-4 py-2 flex justify-between items-center">
                    <span className="font-bold text-sm tracking-wide">TABLE {r.table}</span>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                      <span className="text-yellow-300">★</span> {r.compatibility}
                    </div>
                  </div>
                  
                  {/* Participants */}
                  <div className="p-5 flex items-center justify-between relative">
                    {/* Participant 1 */}
                    <div className="flex flex-col items-center gap-2 z-10 w-1/3">
                      <div className="w-14 h-14 rounded-full bg-blue-50 border-2 border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xl shadow-inner">
                        {r.p1.name === 'Empty Seat' ? '?' : r.p1.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900 text-center text-sm">{r.p1.name}</span>
                    </div>

                    {/* VS divider */}
                    <div className="flex flex-col items-center justify-center z-10 w-1/3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold border border-gray-200">
                        VS
                      </div>
                    </div>

                    {/* Participant 2 */}
                    <div className="flex flex-col items-center gap-2 z-10 w-1/3">
                      <div className="w-14 h-14 rounded-full bg-pink-50 border-2 border-pink-200 text-pink-700 flex items-center justify-center font-bold text-xl shadow-inner">
                        {r.p2.name === 'Empty Seat' ? '?' : r.p2.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-900 text-center text-sm">{r.p2.name}</span>
                    </div>
                  </div>

                  {/* Edit Overlay (Hover) */}
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                    <button 
                      onClick={() => showToast(`Edit mode activated for Table ${r.table}`)}
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 flex items-center gap-2 shadow-sm"
                    >
                      <Edit size={14} /> Edit Table
                    </button>
                    <button 
                      onClick={() => handleClearTable(r.table)}
                      className="px-4 py-2 bg-[#1B2A4A] text-white font-semibold text-sm hover:bg-opacity-90 flex items-center gap-2 shadow-sm"
                    >
                      <AlertCircle size={14} /> Clear
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Empty Table Placeholder */}
              <div 
                onClick={handleAddTable}
                className="bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 p-8 min-h-[160px] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Users size={24} className="mb-2 opacity-50" />
                <span className="font-semibold text-sm">Add Manual Table</span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 p-4 bg-white flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-yellow-500" />
              <span>2 participants currently unmatched (Diana R., Charlie K.)</span>
            </div>
            <button className="text-[var(--color-navy)] font-semibold hover:text-[#C9A84C] transition-colors flex items-center gap-1">
              View details <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
