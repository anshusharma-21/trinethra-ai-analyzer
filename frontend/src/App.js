// import React, { useState, useEffect } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function App() {
//   const [transcript, setTranscript] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const handleAnalyze = async () => {
//     if (!transcript.trim()) return alert("Please enter transcript.");
//     setLoading(true);
//     setResult(null);
//     try {
//       const res = await fetch('http://localhost:5000/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ transcript })
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) { alert("Error connecting to server."); }
//     setLoading(false);
//   };

//   const downloadPDF = () => {
//     const input = document.getElementById('report-area');
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
//       pdf.save("Performance_Report.pdf");
//     });
//   };

//   return (
//     <div className={`${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-colors duration-500 font-sans`}>
      
//       {/* PROFESSIONAL HEADER */}
//       <nav className={`flex justify-between items-center px-8 py-4 border-b ${darkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-white/50'} backdrop-blur-md sticky top-0 z-50`}>
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
//           <h1 className="text-xl font-bold tracking-tight uppercase">Trinethra <span className="font-light">v2.0</span></h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
//             {darkMode ? '☀️ Light' : '🌙 Dark'}
//           </button>
//           {result && <button onClick={downloadPDF} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-lg">Download PDF</button>}
//         </div>
//       </nav>

//       <div className="max-w-6xl mx-auto p-6 md:p-10">
//         {/* INPUT BOX AREA */}
//         <div className={`${darkMode ? 'bg-slate-800/40' : 'bg-white/40'} glass-effect border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow-xl mb-10`}>
//           <h2 className="text-sm font-bold mb-3 uppercase tracking-widest text-blue-500">Analysis Engine</h2>
//           <textarea
//             className={`w-full h-40 bg-transparent border-none outline-none text-lg resize-none placeholder-slate-400`}
//             placeholder="Paste supervisor transcript here for deep analysis..."
//             value={transcript}
//             onChange={(e) => setTranscript(e.target.value)}
//           />
//           <div className="flex justify-end mt-4">
//             <button onClick={handleAnalyze} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform active:scale-95 disabled:opacity-50 shadow-blue-500/20 shadow-xl">
//               {loading ? 'Processing Model...' : 'Run Diagnostics'}
//             </button>
//           </div>
//         </div>

//         {/* RESULTS AREA */}
//         {result && (
//           <div id="report-area" className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
//               {/* SCORE BOX */}
//               <div className="animate-fade-up bg-blue-600 p-6 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center text-white">
//                 <p className="text-[10px] uppercase font-bold opacity-80 mb-2">Performance Score</p>
//                 <div className="text-6xl font-black">{result.score}</div>
//                 <p className="mt-2 font-medium text-xs opacity-90">{result.label}</p>
//               </div>

//               {/* KPI BOX */}
//               <div className="animate-fade-up delay-100 md:col-span-3 glass-card p-6 rounded-2xl hover:scale-[1.02] transition-transform duration-300">
//                 <h3 className="text-xs font-bold text-blue-500 uppercase mb-4">KPI Impact Domains</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {result.kpiMapping?.map((k, i) => (
//                     <span key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg text-sm font-bold border border-blue-200 dark:border-blue-800">{k.kpi}</span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* GAP IDENTIFICATION */}
//             <div className="animate-fade-up delay-200 bg-red-500/10 border border-red-500/20 p-8 rounded-3xl hover:scale-[1.01] transition-all duration-300">
//               <h3 className="text-red-500 font-black text-xs uppercase tracking-widest mb-3">Critical Gap Analysis</h3>
//               <p className="leading-relaxed text-lg italic opacity-90">"{result.gaps}"</p>
//             </div>

//             {/* EVIDENCE */}
//             <div className="animate-fade-up delay-300 glass-card p-8 rounded-3xl">
//               <h3 className="text-xs font-bold text-slate-400 uppercase mb-6 text-center tracking-widest">Behavioral Evidence Logs</h3>
//               <div className="grid md:grid-cols-2 gap-4">
//                 {result.evidence?.map((item, index) => (
//                   <div key={index} className={`p-5 rounded-2xl border-l-4 transition-all hover:translate-x-2 ${item.signal === 'positive' ? 'bg-emerald-500/5 border-emerald-500' : 'bg-rose-500/5 border-rose-500'}`}>
//                     <p className="text-sm font-medium italic mb-2">"{item.quote}"</p>
//                     <p className="text-[10px] uppercase font-black opacity-40 italic">Insight: {item.interpretation}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .glass-effect { background: ${darkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.7)'}; backdrop-filter: blur(20px); }
//         .glass-card { background: ${darkMode ? 'rgba(30, 41, 59, 0.4)' : 'rgba(255, 255, 255, 0.4)'}; border: 1px solid ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}; shadow: 0 10px 30px rgba(0,0,0,0.05); }
//         @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
//         .animate-fade-up { animation: fade-up 0.6s ease forwards; }
//         .delay-100 { animation-delay: 0.1s; }
//         .delay-200 { animation-delay: 0.2s; }
//         .delay-300 { animation-delay: 0.3s; }
//       `}</style>
//     </div>
//   );
// }
// export default App;

















// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function App() {
//   const [transcript, setTranscript] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   const handleAnalyze = async () => {
//     if (!transcript.trim()) return alert("Pehle transcript dalo!");
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ transcript })
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) { alert("Server connection error!"); }
//     setLoading(false);
//   };

//   const downloadPDF = () => {
//     const input = document.getElementById('report-area');
//     html2canvas(input, { scale: 2, backgroundColor: darkMode ? '#0f172a' : '#f8fafc' }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
//       pdf.save("DeepThought_Analysis.pdf");
//     });
//   };

//   return (
//     <div className={`${darkMode ? 'bg-[#0f172a] text-white' : 'bg-slate-50 text-slate-900'} min-h-screen transition-all duration-700`}>
      
//       {/* 1. FIXED STICKY HEADER */}
//       <nav className={`fixed top-0 w-full z-[100] px-8 py-4 backdrop-blur-2xl border-b ${darkMode ? 'border-white/10 bg-black/20' : 'border-black/5 bg-white/30'} flex justify-between items-center shadow-2xl`}>
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)]">
//             <span className="text-white font-black">T</span>
//           </div>
//           <h1 className="text-xl font-black tracking-tighter uppercase">Trinethra <span className="font-thin opacity-50 text-xs">AURA EDITION</span></h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <button onClick={() => setDarkMode(!darkMode)} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-current hover:bg-current hover:text-white transition-all">
//             {darkMode ? 'Switch Light' : 'Switch Dark'}
//           </button>
//           {result && <button onClick={downloadPDF} className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-bold uppercase shadow-lg hover:scale-105 transition-transform">Save PDF</button>}
//         </div>
//       </nav>

//       <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
//         {/* 2. LARGE GLASS INPUT BOX */}
//         <div className={`p-1 rounded-[2.5rem] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-2xl mb-16`}>
//           <div className={`backdrop-blur-3xl rounded-[2.3rem] p-10 ${darkMode ? 'bg-black/40' : 'bg-white/60'} border border-white/30`}>
//             <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">Input Terminal</p>
//             <textarea
//               className="w-full h-48 bg-transparent border-none outline-none text-2xl font-light placeholder:opacity-30"
//               placeholder="Paste fellow transcript here..."
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//             />
//             <div className="flex justify-end mt-6">
//               <button onClick={handleAnalyze} disabled={loading} className="group relative px-12 py-5 bg-indigo-600 rounded-[1.5rem] overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95">
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//                 <span className="relative text-white font-black uppercase text-xs tracking-[0.2em]">{loading ? 'Processing Brain...' : 'Generate Intelligence'}</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 3. ADVANCED RESULTS DASHBOARD */}
//         {result && (
//           <div id="report-area" className="animate-in fade-in slide-in-from-bottom-10 duration-1000 space-y-10">
            
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* LARGE SCORE BOX */}
//               <div className={`lg:col-span-1 p-10 rounded-[3rem] backdrop-blur-3xl border border-white/20 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden ${darkMode ? 'bg-indigo-900/40 text-white' : 'bg-indigo-600 text-white shadow-indigo-200'}`}>
//                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-3xl" />
//                 <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">Metric Score</p>
//                 <h2 className="text-[10rem] font-black leading-none tracking-tighter drop-shadow-2xl">{result.score}</h2>
//                 <div className="mt-4 px-6 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
//                    <p className="text-xs font-black uppercase tracking-widest">{result.label}</p>
//                 </div>
//               </div>

//               {/* KPI & GAPS SECTION */}
//               <div className="lg:col-span-2 space-y-8">
//                 <div className={`p-10 rounded-[3rem] backdrop-blur-3xl border border-white/20 shadow-xl ${darkMode ? 'bg-white/5' : 'bg-white/80'}`}>
//                   <h3 className="text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-6 italic underline decoration-indigo-500 underline-offset-8">Impact Domains</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {result.kpiMapping?.map((k, i) => (
//                       <span key={i} className="px-5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
//                         {k.kpi}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className={`p-10 rounded-[3rem] backdrop-blur-3xl border border-red-500/20 shadow-xl ${darkMode ? 'bg-red-500/5' : 'bg-red-50/50'}`}>
//                   <h3 className="text-red-500 font-black text-[10px] uppercase tracking-widest mb-4">Critical Gaps</h3>
//                   <p className="text-2xl font-thin italic leading-snug opacity-80 underline decoration-red-500/20 text-red-700 dark:text-red-400">
//                     "{result.gaps}"
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* EVIDENCE SECTION */}
//             <div className={`p-12 rounded-[3.5rem] backdrop-blur-3xl border border-white/10 shadow-2xl ${darkMode ? 'bg-white/5' : 'bg-white/40'}`}>
//               <p className="text-center text-[10px] font-black uppercase tracking-[0.5em] mb-12 opacity-30">Behavioral Evidence Matrix</p>
//               <div className="grid md:grid-cols-2 gap-8">
//                 {result.evidence?.map((item, index) => (
//                   <div key={index} className={`p-8 rounded-[2rem] border backdrop-blur-md transition-all hover:scale-[1.03] ${item.signal === 'positive' ? 'bg-emerald-500/5 border-emerald-500/20 shadow-emerald-500/5' : 'bg-rose-500/5 border-rose-500/20 shadow-rose-500/5'}`}>
//                     <p className="text-xl font-bold italic mb-6 leading-relaxed">"{item.quote}"</p>
//                     <div className="pt-6 border-t border-black/5 dark:border-white/5">
//                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Interpretation</span>
//                       <p className="text-sm opacity-60 font-medium mt-1 leading-relaxed">{item.interpretation}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </main>

//       {/* GLOBAL GLASS STYLES */}
//       <style jsx>{`
//         body { background: ${darkMode ? '#0f172a' : '#f8fafc'}; overflow-x: hidden; }
//         .backdrop-blur-3xl { backdrop-filter: blur(40px); }
//       `}</style>
//     </div>
//   );
// }
// export default App;
















// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// function App() {
//   const [transcript, setTranscript] = useState('');
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleAnalyze = async () => {
//     if (!transcript.trim()) return alert("Pehle data dalo!");
//     setLoading(true);
//     try {
//       const res = await fetch('http://localhost:5000/analyze', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ transcript })
//       });
//       const data = await res.json();
//       setResult(data);
//     } catch (err) { alert("Server Down!"); }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-300 font-mono selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
//       {/* 🔮 ANIMATED BACKGROUND ORB */}
//       <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse"></div>
//       <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>

//       {/* 🛸 CYBER NAV */}
//       <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-10 py-4 flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="h-3 w-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
//           <h1 className="text-sm font-black tracking-[0.5em] uppercase text-cyan-400">Trinethra // Core</h1>
//         </div>
//         <div className="flex gap-4">
//           {result && <button className="text-[10px] border border-cyan-500/50 text-cyan-400 px-4 py-2 hover:bg-cyan-500 hover:text-black transition-all uppercase font-bold">Export_Data</button>}
//         </div>
//       </nav>

//       <main className="pt-28 pb-20 px-8 max-w-[1400px] mx-auto">
        
//         {/* ⌨️ COMMAND INPUT BOX */}
//         <div className="relative group mb-12">
//           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
//           <div className="relative bg-[#0b1120] border border-white/10 rounded-2xl p-8">
//             <label className="text-[10px] text-cyan-500/60 mb-4 block tracking-widest"> INPUT_STREAM_BY_SUPERVISOR</label>
//             <textarea
//               className="w-full h-32 bg-transparent border-none outline-none text-xl text-white placeholder-slate-700 resize-none"
//               placeholder="System is waiting for transcript..."
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//             />
//             <div className="flex justify-end mt-4">
//               <button 
//                 onClick={handleAnalyze} 
//                 className="bg-cyan-500 text-black px-8 py-3 font-black text-xs uppercase tracking-tighter hover:shadow-[0_0_20px_#06b6d4] transition-all active:scale-95"
//               >
//                 {loading ? 'Crunching_Pixels...' : 'Initialize_Analysis'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* 📊 BENTO GRID RESULTS */}
//         {result && (
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in duration-700">
            
//             {/* SCORE TILE (The Hero) */}
//             <div className="md:col-span-4 bg-[#0b1120] border border-cyan-500/20 rounded-3xl p-10 flex flex-col items-center justify-center relative overflow-hidden group">
//                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_#06b6d4]"></div>
//                <p className="text-[10px] tracking-[0.3em] text-cyan-500 mb-6">PERFORMANCE_INDEX</p>
//                <div className="text-[12rem] font-black leading-none text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">{result.score}</div>
//                <div className="mt-6 px-4 py-1 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/5">
//                  {result.label}
//                </div>
//             </div>

//             {/* GAP & KPI TILE */}
//             <div className="md:col-span-8 grid grid-cols-1 gap-6">
//               <div className="bg-[#0b1120] border border-white/5 rounded-3xl p-8 hover:border-purple-500/40 transition-colors">
//                 <h3 className="text-[10px] text-purple-400 mb-4 tracking-widest uppercase italic font-bold">// Critical_Gaps_Found</h3>
//                 <p className="text-2xl font-light leading-relaxed text-slate-100 italic">
//                   {result.gaps}
//                 </p>
//               </div>

//               <div className="bg-[#0b1120] border border-white/5 rounded-3xl p-8 flex flex-wrap gap-4 items-center">
//                 <h3 className="text-[10px] text-slate-500 tracking-widest uppercase block w-full mb-2">Impact_Vectors:</h3>
//                 {result.kpiMapping?.map((k, i) => (
//                   <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-cyan-400">
//                     {k.kpi}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* EVIDENCE LOGS (Wide Table Look) */}
//             <div className="md:col-span-12 bg-[#0b1120] border border-white/5 rounded-3xl p-10 mt-4">
//               <h3 className="text-center text-[10px] text-slate-600 tracking-[0.6em] uppercase mb-10 italic">Behavioral_Trace_Logs</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 {result.evidence?.map((item, index) => (
//                   <div key={index} className="relative pl-6 border-l border-white/10 group">
//                     <div className={`absolute left-[-4px] top-0 h-4 w-2 rounded-full ${item.signal === 'positive' ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
//                     <p className="text-lg font-medium text-slate-200 mb-3 leading-snug tracking-tight">"{item.quote}"</p>
//                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
//                       AI_Logic: <span className="text-slate-400 font-normal normal-case">{item.interpretation}</span>
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;












import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // --- YE WALA FUNCTION ADD KARO ---
  const downloadPDF = () => {
    const input = document.getElementById('report-area');
    if (!input) return alert("Pehle data analyze karo!");
    
    html2canvas(input, { 
      scale: 2, 
      backgroundColor: '#020617', // Dark background ke liye
      useCORS: true 
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Trinethra_Analysis_Report.pdf");
    });
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return alert("Pehle data dalo!");
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) { alert("Server Down!"); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-mono selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      
      {/* 🔮 ANIMATED BACKGROUND ORBS */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-900/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full"></div>

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-10 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="h-3 w-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
          <h1 className="text-sm font-black tracking-[0.5em] uppercase text-cyan-400">Trinethra // Core</h1>
        </div>
        <div className="flex gap-4">
          {/* --- YAHAN onClick={downloadPDF} ADD KIYA HAI --- */}
          {result && (
            <button 
              onClick={downloadPDF}
              className="text-[10px] border border-cyan-500/50 text-cyan-400 px-4 py-2 hover:bg-cyan-500 hover:text-black transition-all uppercase font-bold"
            >
              Export_Data
            </button>
          )}
        </div>
      </nav>

      <main className="pt-28 pb-20 px-8 max-w-[1400px] mx-auto">
        <div className="relative group mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-[#0b1120] border border-white/10 rounded-2xl p-8">
            <label className="text-[10px] text-cyan-500/60 mb-4 block tracking-widest">INPUT_STREAM_BY_SUPERVISOR</label>
            <textarea
              className="w-full h-32 bg-transparent border-none outline-none text-xl text-white placeholder-slate-700 resize-none"
              placeholder="System is waiting for transcript..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button onClick={handleAnalyze} className="bg-cyan-500 text-black px-8 py-3 font-black text-xs uppercase tracking-tighter hover:shadow-[0_0_20px_#06b6d4] transition-all">
                {loading ? 'Crunching_Pixels...' : 'Initialize_Analysis'}
              </button>
            </div>
          </div>
        </div>

        {/* --- REPORT AREA ID ZARURI HAI PDF KE LIYE --- */}
        {result && (
          <div id="report-area" className="p-6 bg-[#020617] rounded-3xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              <div className="md:col-span-4 bg-[#0b1120] border border-cyan-500/20 rounded-3xl p-10 flex flex-col items-center justify-center relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                 <p className="text-[10px] tracking-[0.3em] text-cyan-500 mb-6 font-bold uppercase">PERFORMANCE_INDEX</p>
                 <div className="text-[12rem] font-black leading-none text-white">{result.score}</div>
                 <div className="mt-6 px-4 py-1 border border-cyan-500/30 rounded text-[10px] font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/5">
                   {result.label}
                 </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-1 gap-6">
                <div className="bg-[#0b1120] border border-white/5 rounded-3xl p-8">
                  <h3 className="text-[10px] text-purple-400 mb-4 tracking-widest uppercase font-bold">// Critical_Gaps_Found</h3>
                  <p className="text-2xl font-light leading-relaxed text-slate-100 italic">{result.gaps}</p>
                </div>

                <div className="bg-[#0b1120] border border-white/5 rounded-3xl p-8 flex flex-wrap gap-4 items-center">
                  <h3 className="text-[10px] text-slate-500 tracking-widest uppercase block w-full mb-2">Impact_Vectors:</h3>
                  {result.kpiMapping?.map((k, i) => (
                    <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-cyan-400">{k.kpi}</span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-12 bg-[#0b1120] border border-white/5 rounded-3xl p-10 mt-4">
                <h3 className="text-center text-[10px] text-slate-600 tracking-[0.6em] uppercase mb-10 italic">Behavioral_Trace_Logs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {result.evidence?.map((item, index) => (
                    <div key={index} className="relative pl-6 border-l border-white/10">
                      <div className={`absolute left-[-4px] top-0 h-4 w-2 rounded-full ${item.signal === 'positive' ? 'bg-cyan-500' : 'bg-red-500'}`}></div>
                      <p className="text-lg font-medium text-slate-200 mb-3">"{item.quote}"</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        AI_Logic: <span className="text-slate-400 font-normal normal-case">{item.interpretation}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;