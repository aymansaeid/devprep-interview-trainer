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
                        <div className="flex flex-col gap-4 mt-6">                            
                            {questions.map((q) => (
                            <QuestionCard
                                key={q.id}
                                question={q}
                                onEdit={handleEditClick}
                                onDelete={handleDelete}
                            />
                        ))}
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL KISMI */}
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
