import { useState } from "react";

export default function QuestionCard({ question, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  // Zorluk seviyesine göre renkler
  const difficultyColor = {
    Easy: "text-green-400 border-green-500/30 bg-green-500/10",
    Medium: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    Hard: "text-red-400 border-red-500/30 bg-red-500/10",
  };

  const glowClass = difficultyColor[question.difficulty] || difficultyColor.Easy;

  return (
    <div 
      className={`relative w-full mb-4 border rounded-2xl transition-all duration-300 overflow-hidden group
      ${isOpen 
        ? "bg-slate-800/80 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]" 
        : "bg-slate-800/40 border-slate-700/50 hover:border-slate-600"
      }`}
    >
      {/* --- BAŞLIK KISMI (Tıklanabilir Alan) --- */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-6 cursor-pointer select-none"
      >
        <div className="flex items-center gap-4 flex-1">
            
          {/* Sol taraftaki ikon (Açılıp kapanma animasyonu) */}
          <div className={`p-2 rounded-lg transition-all duration-300 ${isOpen ? "bg-blue-600 text-white rotate-90" : "bg-slate-700 text-slate-400"}`}>
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
          </div>

          {/* Soru Başlığı ve Kategori */}
          <div>
            <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? "text-blue-400" : "text-white group-hover:text-blue-200"}`}>
              {question.title}
            </h3>
            <div className="flex items-center gap-3 mt-1">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700">
                    {question.category}
                </span>
                
                {/* Zorluk Rozeti */}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${glowClass}`}>
                    {question.difficulty}
                </span>
            </div>
          </div>
        </div>

        {/* --- AKSİYON BUTONLARI (Edit/Delete) --- */}
        {/* e.stopPropagation() sayesinde butona basınca accordion açılıp kapanmaz */}
        <div className="flex items-center gap-2 ml-4">
            <button 
                onClick={(e) => { e.stopPropagation(); onEdit(question); }}
                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                title="Düzenle"
            >
                ✏️
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onDelete(question.id); }}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                title="Sil"
            >
                🗑️
            </button>
        </div>
      </div>

      {/* --- CEVAP ALANI (Animasyonlu Açılma) --- */}
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-6 pt-0 border-t border-slate-700/50">
            <div className="mt-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800 text-slate-300 font-mono text-sm leading-relaxed shadow-inner">
                <span className="block text-xs text-slate-500 mb-2 select-none">// Answer:</span>
                {question.answer}
            </div>
        </div>
      </div>
    </div>
  );
}