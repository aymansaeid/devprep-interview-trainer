import Header from "../components/Header"
import { useState } from "react"

export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        category: "JS",
        difficulty: "Easy",
        answer: "?",

    })

    return (
        <div className="min-h-screen bg-slate-900 text-white">

            <Header />

            <div className="max-w-5xl mx-auto p-6">

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-semibold">
                        Questions
                    </h2>

                    <button onClick={() => setIsOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg">
                        + Add Question
                    </button>

                </div>

                <div className="bg-slate-800 rounded-xl p-6 text-slate-400">
                    No questions yet.
                </div>

            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

                    <div className="bg-white text-black w-full max-w-md p-6 rounded-xl shadow-lg">

                        <h3 className="text-lg font-semibold mb-4">
                            Add New Question
                        </h3>

                        {/* TITLE */}
                        <input
                            type="text"
                            placeholder="Enter question title"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({ ...formData, title: e.target.value })
                            }
                        />

                        {/* CATEGORY */}
                        <select
                            className="w-full border p-2 rounded-lg mb-3"
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                        >
                            <option value="JS">JavaScript</option>
                            <option value="React">React</option>
                            <option value="Algo">Algorithms</option>
                            <option value="System">System Design</option>
                        </select>

                        {/* DIFFICULTY */}
                        <select
                            className="w-full border p-2 rounded-lg mb-4"
                            value={formData.difficulty}
                            onChange={(e) =>
                                setFormData({ ...formData, difficulty: e.target.value })
                            }
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>


                         {/* ANSWER */}
                        <input
                            type="text"
                            placeholder="Enter the answer of the question"
                            className="w-full border p-2 rounded-lg mb-3"
                            value={formData.answer}
                            onChange={(e) =>
                                setFormData({ ...formData, answer: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 border rounded-lg"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={() => {
                                    console.log(formData)
                                    setIsOpen(false)
                                }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}
