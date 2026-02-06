import Header from "../components/Header"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      
      <Header />

      <div className="max-w-5xl mx-auto p-6">
        
        <div className="flex justify-between items-center mb-6">
          
          <h2 className="text-2xl font-semibold">
            Questions
          </h2>

          <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg">
            + Add Question
          </button>

        </div>

        <div className="bg-slate-800 rounded-xl p-6 text-slate-400">
          No questions yet.
        </div>

      </div>

    </div>
  )
}
