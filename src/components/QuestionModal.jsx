import React from "react";

export default function QuestionModal({ isOpen, onClose, formData, setFormData, onSave, isEditing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* KARARTMA PERDESİ (Backdrop) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* MODAL KUTUSU (Neon & Glass) */}
      <div className="relative w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(59,130,246,0.2)] p-8 transform transition-all scale-100">
        
        {/* Başlık */}
        <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {isEditing ? "✨ Edit Logic" : "New Challenge"}
        </h2>

        <div className="space-y-4">
          
          {/* Soru Başlığı Input */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 ml-1">QUESTION TITLE</label>
            <input
              type="text"
              placeholder="e.g. What is hoisting?"
              className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Kategori Seçimi */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 ml-1">CATEGORY</label>
              <select
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all appearance-none cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="JS">JavaScript</option>
                <option value="React">React</option>
                <option value="Algo">Algorithms</option>
                <option value="System">System Design</option>
              </select>
            </div>

            {/* Zorluk Seçimi */}
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1 ml-1">DIFFICULTY</label>
              <select
                className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all appearance-none cursor-pointer"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Cevap Alanı */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1 ml-1">ANSWER / NOTES</label>
            <textarea
              placeholder="Write the solution here..."
              className="w-full h-32 bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all resize-none"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            />
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
          >
            Cancel
          </button>
          
          <button
            onClick={onSave}
            className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 transition-all"
          >
            {isEditing ? "Update Question" : "Create Question"}
          </button>
        </div>

      </div>
    </div>
  );
}