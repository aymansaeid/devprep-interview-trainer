export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* SOL TARA: LOGO & IKON */}
        <div className="flex items-center gap-3 group cursor-pointer">
          
          {/* Parlayan Logo İkonu */}
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300 group-hover:scale-105">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            {/* Arka plan parıltısı */}
            <div className="absolute inset-0 rounded-xl bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* Logo Yazısı */}
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200 tracking-tight">
              DevPrep
            </h1>
            <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase opacity-80">
              Interview Trainer
            </span>
          </div>
        </div>

        {/* SAĞ TARAF: STATUS ROZETİ */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs text-slate-300 font-medium">System Online</span>
          </div>
        </div>

      </div>
      
      {/* Altın Çizgi (İsteğe bağlı neon çizgi) */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
    </header>
  )
}