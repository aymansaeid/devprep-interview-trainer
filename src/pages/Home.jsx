import Header from "../components/Header"
import { useState, useEffect } from "react"
import { fetchQuestions, createQuestion, removeQuestion, updateQuestion } from "../services/questionService"
import QuestionCard from "../components/QuestionCard";
import QuestionModal from "../components/QuestionModal";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "JS",
        difficulty: "Easy",
        answer: "",
    })
    const [questions, setQuestions] = useState([])
    const [editingId, setEditingId] = useState(null)
    
    // Filter states
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedDifficulty, setSelectedDifficulty] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await fetchQuestions();
            setQuestions(response.data);
        } catch (error) {
            console.error("Veri çekilemedi:", error);
        }
    }

    const handleOpenModal = () => {
        setEditingId(null);
        setFormData({
            title: "",
            category: "JS",
            difficulty: "Easy",
            answer: ""
        });
        setIsOpen(true);
    }

    const handleEditClick = (question) => {
        setEditingId(question.id);
        setFormData({
            title: question.title,
            category: question.category,
            difficulty: question.difficulty,
            answer: question.answer
        });
        setIsOpen(true);
    }

    const handleSave = async () => {
        if (!formData.title.trim()) return;
        try {
            if (editingId) {
                await updateQuestion(editingId, formData);
            } else {
                await createQuestion(formData);
            }
            await loadData();
            setIsOpen(false);
        } catch (error) {
            console.error("İşlem hatası:", error);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            await removeQuestion(id);
            loadData();
        }
    }

    // Filtered questions
    const filteredQuestions = questions.filter(q => {
        const matchesCategory = selectedCategory === "All" || q.category === selectedCategory;
        const matchesDifficulty = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
        const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            q.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesDifficulty && matchesSearch;
    });

    // Stats calculations
    const stats = {
        total: questions.length,
        easy: questions.filter(q => q.difficulty === "Easy").length,
        medium: questions.filter(q => q.difficulty === "Medium").length,
        hard: questions.filter(q => q.difficulty === "Hard").length,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
            <Header />

            <div className="max-w-7xl mx-auto p-6 md:p-8">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 hover:border-blue-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Total</p>
                                <p className="text-3xl font-bold text-white">{stats.total}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 hover:border-green-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Easy</p>
                                <p className="text-3xl font-bold text-green-400">{stats.easy}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                                <span className="text-2xl">🟢</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 hover:border-yellow-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Medium</p>
                                <p className="text-3xl font-bold text-yellow-400">{stats.medium}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                                <span className="text-2xl">🟡</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-5 hover:border-red-500/50 transition-all group">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Hard</p>
                                <p className="text-3xl font-bold text-red-400">{stats.hard}</p>
                            </div>
                            <div className="p-3 rounded-xl bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-colors">
                                <span className="text-2xl">🔴</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-6">
                    <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                        
                        {/* Search Input */}
                        <div className="flex-1 max-w-md relative group">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">
                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all cursor-pointer"
                            >
                                <option value="All">All Categories</option>
                                <option value="JS">JavaScript</option>
                                <option value="React">React</option>
                                <option value="Algo">Algorithms</option>
                                <option value="System">System Design</option>
                                <option value="CSS">CSS & Styling</option>
                                <option value="Node">Node.js</option>
                            </select>

                            {/* Difficulty Filter */}
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all cursor-pointer"
                            >
                                <option value="All">All Levels</option>
                                <option value="Easy">🟢 Easy</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="Hard">🔴 Hard</option>
                            </select>

                            {/* Add Question Button */}
                            <button 
                                onClick={handleOpenModal}
                                className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="hidden sm:inline">Add Question</span>
                            </button>
                        </div>
                    </div>

                    {/* Active Filter Tags */}
                    {(searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All") && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-700/50">
                            <span className="text-xs text-slate-400">Active filters:</span>
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs">
                                    Search: "{searchQuery}"
                                    <button onClick={() => setSearchQuery("")} className="hover:text-blue-300">×</button>
                                </span>
                            )}
                            {selectedCategory !== "All" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs">
                                    {selectedCategory}
                                    <button onClick={() => setSelectedCategory("All")} className="hover:text-purple-300">×</button>
                                </span>
                            )}
                            {selectedDifficulty !== "All" && (
                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs">
                                    {selectedDifficulty}
                                    <button onClick={() => setSelectedDifficulty("All")} className="hover:text-pink-300">×</button>
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="text-lg font-semibold text-slate-300">
                        {filteredQuestions.length === questions.length 
                            ? `All Questions (${questions.length})`
                            : `Showing ${filteredQuestions.length} of ${questions.length} questions`
                        }
                    </h2>
                </div>

                {/* Questions List */}
                {filteredQuestions.length === 0 ? (
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 text-center">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-700/50 flex items-center justify-center">
                                <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-300 mb-2">
                                {questions.length === 0 ? "No questions yet" : "No matching questions"}
                            </h3>
                            <p className="text-slate-400 mb-6">
                                {questions.length === 0 
                                    ? "Start building your interview prep library by adding your first question!"
                                    : "Try adjusting your filters or search query"
                                }
                            </p>
                            {questions.length === 0 && (
                                <button
                                    onClick={handleOpenModal}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add First Question
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredQuestions.map((q) => (
                            <QuestionCard
                                key={q.id}
                                question={q}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL */}
            <QuestionModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                isEditing={!!editingId}
            />
        </div>
    )
}