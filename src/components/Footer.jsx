// src/components/Footer.jsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-900/50 backdrop-blur-xl">
      {/* Gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                  DevPrep
                </h3>
                <p className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                  Interview Trainer
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Master your tech interviews with organized question banks and smart practice tools.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-300 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-blue-400 transition-all duration-300"></span>
                  All Questions
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-purple-400 transition-all duration-300"></span>
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-pink-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[2px] bg-pink-400 transition-all duration-300"></span>
                  Practice Mode
                </a>
              </li>
            </ul>
          </div>

          {/* Right: Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Connect</h4>
            <div className="flex flex-col gap-3">
              
              {/* GitHub Link */}
              <a 
                href="https://github.com/aymansaeid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/80 transition-all w-fit"
              >
                <div className="p-2 rounded-lg bg-slate-900/50 group-hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-mono">View on</span>
                  <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">GitHub</span>
                </div>
                <svg className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              {/* Social Links */}
              <div className="flex gap-3 mt-2">
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-400/50 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all group"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a 
                  href="https://www.linkedin.com/in/ayman-saeid-/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-400/50 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all group"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                </a>

                <a 
                  href="mailto:aemon.saeid@gmail.com" 
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-purple-400/50 hover:bg-purple-500/10 text-slate-400 hover:text-purple-400 transition-all group"
                  aria-label="Email"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>© {currentYear} DevPrep.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Built with</span>
              <span className="hidden md:inline text-red-400 animate-pulse">♥</span>
              <span className="hidden md:inline">and React</span>
            </div>

            {/* Tech Stack Badges */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">Powered by:</span>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-[10px] font-mono text-blue-400">
                  React
                </span>
                <span className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-[10px] font-mono text-cyan-400">
                  Tailwind
                </span>
                <span className="px-2 py-1 rounded-md bg-slate-800/50 border border-slate-700/50 text-[10px] font-mono text-purple-400">
                  Node.js
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </footer>
  );
}