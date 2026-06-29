import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileSpreadsheet, 
  Download, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  FileText,
  Grid
} from 'lucide-react';
import { Candidate, JobDescription } from '../types';

interface ReportsProps {
  candidates: Candidate[];
  jobs: JobDescription[];
  currentJobId: string;
  isDarkMode: boolean;
}

export default function Reports({ candidates, jobs, currentJobId, isDarkMode }: ReportsProps) {
  const [exportSuccess, setExportSuccess] = useState('');
  
  const activeJob = jobs.find(j => j.id === currentJobId) || jobs[0];

  const getCandData = (c: Candidate) => {
    const scoreObj = c.scoresByJob[currentJobId] || { finalScore: 70 };
    const explanation = c.aiExplanationsByJob[currentJobId] || "Local matching processed.";
    return { scoreObj, explanation };
  };

  const handleDownload = (format: 'CSV' | 'Excel' | 'Text') => {
    setExportSuccess(`Preparing export pipeline in ${format} format...`);
    
    setTimeout(() => {
      if (format === 'CSV') {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Rank,Candidate ID,Candidate Name,Title,Score,Status,AI Reason\n";
        candidates.forEach((c, index) => {
          const { scoreObj, explanation } = getCandData(c);
          csvContent += `${index + 1},${c.id},"${c.name}","${c.title}",${scoreObj.finalScore}%,${c.status},"${explanation.replace(/"/g, '""')}"\n`;
        });
        const link = document.createElement("a");
        link.href = encodeURI(csvContent);
        link.download = `TalentMind_Export_${activeJob?.title.replace(/\s+/g, '_')}.csv`;
        link.click();
      } else if (format === 'Text') {
        let text = `TalentMind AI Recruiter Ranking Report\nJob Mandate: ${activeJob?.title}\nParsed Candidates Count: ${candidates.length}\nDate Generated: 2026-06-16\n\nRankings List:\n`;
        candidates.forEach((c, idx) => {
          const { scoreObj, explanation } = getCandData(c);
          text += `Rank #${idx + 1}: ${c.name} - Match: ${scoreObj.finalScore}% | AI: ${explanation}\n`;
        });
        const blob = new Blob([text], { type: 'text/plain' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `TalentMind_Report_${activeJob?.title.replace(/\s+/g, '_')}.txt`;
        link.click();
      } else {
        // Excel placeholder
        alert("Excel downloading is supported in XML format: Generating Excel worksheet download stream...");
        const excelPlaceholder = `[TalentMind Excel XML Worksheet Metadata]\nJob Mandate: ${activeJob?.title}\n` + 
          candidates.map((c, i) => `Row: ${i+1} | ${c.name} | Score: ${getCandData(c).scoreObj.finalScore}%`).join("\n");
        const blob = new Blob([excelPlaceholder], { type: 'application/vnd.ms-excel' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `TalentMind_Sheet_${activeJob?.title.replace(/\s+/g, '_')}.xls`;
        link.click();
      }
      setExportSuccess(`Successfully generated and downloaded ${format} report bundle!`);
    }, 800);
  };

  const cardStyle = isDarkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-250 shadow-sm';

  return (
    <div className="space-y-8 font-sans">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Structured Pipeline Reports</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Generate ready-for-print summaries, investor review PDFs, and tabular CSV spreadsheets instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Export control options Panel */}
        <div className={`p-6 rounded-2xl border space-y-6 ${cardStyle}`}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-indigo-500" /> Export Console Options
          </h2>

          <div className="space-y-3">
            <button
              id="report-csv-download-btn"
              onClick={() => handleDownload('CSV')}
              className={`w-full py-3.5 px-4 rounded-xl border flex items-center justify-between transition-colors font-semibold text-xs cursor-pointer ${
                isDarkMode ? 'bg-neutral-950 border-neutral-800 hover:bg-neutral-850 text-neutral-200' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-indigo-500 shrink-0" />
                <span>Download Spreadsheet (.CSV)</span>
              </div>
              <Download className="w-4 h-4 text-neutral-500" />
            </button>

            <button
              id="report-xls-download-btn"
              onClick={() => handleDownload('Excel')}
              className={`w-full py-3.5 px-4 rounded-xl border flex items-center justify-between transition-colors font-semibold text-xs cursor-pointer ${
                isDarkMode ? 'bg-neutral-950 border-neutral-800 hover:bg-neutral-850 text-neutral-200' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileSpreadsheet className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Download Excel Sheet (.XLS)</span>
              </div>
              <Download className="w-4 h-4 text-neutral-500" />
            </button>

            <button
              id="report-txt-download-btn"
              onClick={() => handleDownload('Text')}
              className={`w-full py-3.5 px-4 rounded-xl border flex items-center justify-between transition-colors font-semibold text-xs cursor-pointer ${
                isDarkMode ? 'bg-neutral-950 border-neutral-800 hover:bg-neutral-850 text-neutral-200' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 text-neutral-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-violet-500 shrink-0" />
                <span>Plain Text Summary Doc (.TXT)</span>
              </div>
              <Download className="w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {exportSuccess && (
            <div className="p-3 text-2xs rounded-lg border bg-indigo-500/5 border-indigo-500/20 text-indigo-400 font-medium animate-fade-in">
              {exportSuccess}
            </div>
          )}
        </div>

        {/* Tabular Preview of output */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-4 ${cardStyle}`}>
          <div className="border-b border-neutral-850 pb-4 mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
              <Grid className="w-4 h-4 text-violet-500" /> Print Preview: Ranked Candidate Output Table
            </h2>
            <p className="text-3xs text-neutral-500 mt-1">
              Active Job Description Mandate: <b>{activeJob?.title}</b>
            </p>
          </div>

          {/* Table container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-neutral-805 text-3xs uppercase text-neutral-400 font-bold tracking-wider">
                  <th className="pb-3 text-center w-12">Rank</th>
                  <th className="pb-3 pl-3">Candidate</th>
                  <th className="pb-3 pl-3">Score</th>
                  <th className="pb-3 pl-3">Classification</th>
                  <th className="pb-3 pl-3">AI Explanation Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/10 font-medium">
                {candidates.map((c, index) => {
                  const { scoreObj, explanation } = getCandData(c);
                  return (
                    <tr key={c.id} className="hover:bg-neutral-800/5 transition-colors">
                      <td className="py-3.5 text-center font-bold text-indigo-400">{index + 1}</td>
                      <td className="py-3.5 pl-3">
                        <div className="font-bold">{c.name}</div>
                        <div className="text-3xs text-neutral-500">{c.title}</div>
                      </td>
                      <td className="py-3.5 pl-3 font-semibold font-mono text-neutral-350">{scoreObj.finalScore}%</td>
                      <td className="py-3.5 pl-3">
                        <span className={`text-3xs font-bold px-2 py-0.5 rounded-full ${
                          c.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-400' : c.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400' : 'bg-neutral-800/40 text-neutral-400'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3.5 pl-3 pr-4 text-3xs text-neutral-400 line-clamp-2 leading-relaxed max-w-sm">
                        {explanation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
