import Header from "../components/Header"
import { useState, useEffect } from "react"
import { fetchQuestions, createQuestion, removeQuestion, updateQuestion } from "../services/questionService"

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "JS",
        difficulty: "Easy",
        answer: "?",

    })
    const [questions, setQuestions] = useState([])

    const [editingId, setEditingId] = useState(null)

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
            answer: "?"
        });
        setIsOpen(true);
    }

    const handleEditClick = (question) => {
        setEditingId(question.id); // Düzenleme modu aktif
        setFormData({
            title: question.title,
            category: question.category,
            difficulty: question.difficulty,
            answer: question.answer
        });
        setIsOpen(true); // Modalı aç
    }

    const handleSave = async () => {
        if (!formData.title.trim()) return;
        try {
            if (editingId) {
                // EĞER DÜZENLEME MODUNDAYSAK GÜNCELLE
                await updateQuestion(editingId, formData);
            } else {
                // DEĞİLSE YENİ EKLE
                await createQuestion(formData);
            }

            await loadData(); // Listeyi yenile
            setIsOpen(false); // Modalı kapat

        } catch (error) {
            console.error("İşlem hatası:", error);
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Silmek istediğinden emin misin?")) {
            await removeQuestion(id);
            loadData();
        }
    }


    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <Header />

            <div className="max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                        Questions ({questions.length})
                    </h2>

                    <button onClick={handleOpenModal}
                        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg">
                        + Add Question
                    </button>
                </div>

                {questions.length === 0 ? (
                    <div className="bg-slate-800 rounded-xl p-6 text-slate-400 text-center">
                        Henüz soru eklenmemiş. İlk sorunu ekle!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {questions.map((q) => (
                            <div key={q.id} className="bg-slate-800 p-4 rounded-xl flex justify-between items-center border border-slate-700 hover:border-blue-500 transition group">
                                <div>
                                    <h3 className="font-semibold text-lg">{q.title}</h3>
                                    <div className="flex gap-2 mt-1">
                                        <span className="text-xs px-2 py-1 bg-slate-700 rounded text-slate-300">
                                            {q.category}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded 
                                            ${q.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                                                q.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                                                    'bg-red-900 text-red-300'}`}>
                                            {q.difficulty}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-slate-400 text-sm italic">{q.answer}</p>
                                </div>

                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {/* DÜZENLEME BUTONU */}
                                    <button
                                        onClick={() => handleEditClick(q)}
                                        className="text-blue-400 hover:bg-blue-900/30 p-2 rounded-lg transition"
                                    >
                                        ✏️
                                    </button>

                                    {/* SİLME BUTONU */}
                                    <button
                                        onClick={() => handleDelete(q.id)}
                                        className="text-red-400 hover:bg-red-900/30 p-2 rounded-lg transition"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL KISMI */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-slate-800 text-white w-full max-w-md p-6 rounded-xl shadow-2xl border border-slate-700">
                        <h3 className="text-xl font-semibold mb-4 text-blue-400">
                            {editingId ? "Edit Question" : "Add New Question"}
                        </h3>

                        <input type="text" placeholder="Question Title" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />

                        <div className="flex gap-3 mb-3">
                            <select className="flex-1 bg-slate-900 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                <option value="JS">JavaScript</option>
                                <option value="React">React</option>
                                <option value="Algo">Algorithms</option>
                                <option value="System">System Design</option>
                            </select>

                            <select className="flex-1 bg-slate-900 border border-slate-600 p-3 rounded-lg focus:outline-none focus:border-blue-500"
                                value={formData.difficulty}
                                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <textarea placeholder="Answer (Optional)" className="w-full bg-slate-900 border border-slate-600 p-3 rounded-lg mb-4 h-24 focus:outline-none focus:border-blue-500"
                            value={formData.answer}
                            onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                        />

                        <div className="flex justify-end gap-3">
                            <button onClick={() => setIsOpen(false)} className="px-4 py-2 hover:bg-slate-700 rounded-lg transition">
                                Cancel
                            </button>
                            <button onClick={handleSave} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition shadow-lg shadow-blue-900/20">
                                {editingId ? "Update" : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
