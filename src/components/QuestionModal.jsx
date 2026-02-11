import React from "react";

export default function QuestionModal({ isOpen, onClose, formData, setFormData, onSave, isEditing }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      {/* BACKDROP with enhanced blur */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>

      {/* MODAL BOX - Enhanced glass morphism */}
      <div className="relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_80px_rgba(59,130,246,0.3)] p-8 transform transition-all scale-100 animate-in zoom-in-95 duration-300">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all hover:rotate-90 duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title with icon */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditing ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {isEditing ? "Edit Challenge" : "Create New Challenge"}
          </h2>
        </div>

        <div className="space-y-6">
          
          {/* Question Title Input - Full width */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2 ml-1 uppercase tracking-wider">
              <span className="w-1 h-4 bg-blue-500 rounded-full group-focus-within:h-6 transition-all"></span>
              Question Title
            </label>
            <input
              type="text"
              placeholder="e.g. Explain the concept of closures in JavaScript"
              className="w-full bg-slate-950/70 border border-slate-700/50 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category and Difficulty in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Select */}
            <div className="group">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2 ml-1 uppercase tracking-wider">
                <span className="w-1 h-4 bg-purple-500 rounded-full group-focus-within:h-6 transition-all"></span>
                Category
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-950/70 border border-slate-700/50 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all appearance-none cursor-pointer pr-12"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="JS">JavaScript</option>
                  <option value="React">React</option>
                  <option value="Algo">Algorithms</option>
                  <option value="System">System Design</option>
                  <option value="CSS">CSS & Styling</option>
                  <option value="Node">Node.js</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Difficulty Select with visual indicators */}
            <div className="group">
              <label className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2 ml-1 uppercase tracking-wider">
                <span className="w-1 h-4 bg-pink-500 rounded-full group-focus-within:h-6 transition-all"></span>
                Difficulty Level
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-950/70 border border-slate-700/50 rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all appearance-none cursor-pointer pr-12"
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                >
                  <option value="Easy">🟢 Easy</option>
                  <option value="Medium">🟡 Medium</option>
                  <option value="Hard">🔴 Hard</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Answer/Notes Textarea */}
          <div className="group">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2 ml-1 uppercase tracking-wider">
              <span className="w-1 h-4 bg-blue-500 rounded-full group-focus-within:h-6 transition-all"></span>
              Answer / Solution Notes
            </label>
            <textarea
              placeholder="Write the detailed solution, key points, or code examples here..."
              className="w-full h-48 bg-slate-950/70 border border-slate-700/50 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all resize-none font-mono text-sm leading-relaxed"
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
            />
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-xs text-slate-500">Supports markdown formatting</span>
              <span className="text-xs text-slate-500">{formData.answer.length} characters</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-slate-800/50">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all font-medium border border-transparent hover:border-slate-700"
          >
            Cancel
          </button>
          
          <button
            onClick={onSave}
            disabled={!formData.title.trim()}
            className="group relative px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isEditing ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Challenge
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Challenge
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>

      </div>
    </div>
  );
}