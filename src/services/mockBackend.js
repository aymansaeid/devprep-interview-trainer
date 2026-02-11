import { api } from "./api";

const STORAGE_KEY = "devprep_questions";

// Örnek Başlangıç Verileri (Seed Data)
const INITIAL_DATA = [
  {
    id: 17092834,
    title: "Explain the difference between var, let, and const",
    category: "JS",
    difficulty: "Easy",
    answer: "var is function scoped and hoisted. let and const are block scoped. const cannot be reassigned while let can."
  },
  {
    id: 17092835,
    title: "What is the Virtual DOM in React?",
    category: "React",
    difficulty: "Medium",
    answer: "The Virtual DOM is a lightweight copy of the real DOM. React updates this first, compares it with the previous version (diffing), and only updates the changed parts in the real DOM."
  },
  {
    id: 17092836,
    title: "How do you handle state management in complex apps?",
    category: "System",
    difficulty: "Hard",
    answer: "For complex apps, we can use Redux, Zustand, or Context API depending on the scalability needs. State should be lifted up or managed globally to avoid prop drilling."
  },
  {
    id: 17092837,
    title: "Which algoriths uses LIFO?",
    category: "ALGO",
    difficulty: "Medium",
    answer: "Certain data structures like Stacks and other variants of Stacks use LIFO approach for processing data."
  }
]

const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  // Eğer localStorage'da veri varsa onu getir
  if (data) {
    return JSON.parse(data);
  }

  // Eğer veri YOKSA (ilk giriş), başlangıç verilerini kaydet ve getir
  else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
};

// LocalStorage'a veri yazan yardımcı fonksiyon
const setData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// İSTEKLERİ YAKALAYAN KISIM (INTERCEPTOR)
api.interceptors.request.use((config) => {
  const { method, url, data } = config;

  // Her istekte güncel veriyi çekelim
  let questions = getData();

  // --- GET (Listeleme) ---
  if (method === "get" && url === "/questions") {
    console.log("Mock API: Sorular getiriliyor...");
    config.adapter = async () => ({
      data: questions,
      status: 200,
      statusText: "OK",
      headers: {},
      config
    });
  }

  // --- POST (Ekleme) ---
  if (method === "post" && url === "/questions") {
    const body = typeof data === 'string' ? JSON.parse(data) : data;
    const newItem = {
      ...body,             // Gelen veriyi al
      id: Date.now()       // Benzersiz ID ekle
    };

    questions.unshift(newItem); // En başa ekle
    setData(questions);         // Kaydet
    console.log("Mock API: Yeni soru eklendi ->", newItem);

    config.adapter = async () => ({
      data: newItem,
      status: 201,
      statusText: "Created",
      headers: {},
      config
    });
  }

  // --- DELETE (Silme) ---
  // url şöyle gelir: "/questions/1738923423" -> ID'yi url'den ayıklamamız lazım
  if (method === "delete" && url.includes("/questions/")) {
    const id = Number(url.split("/").pop());

    const initialLength = questions.length;
    questions = questions.filter(q => q.id !== id);

    if (questions.length !== initialLength) {
      setData(questions);
      console.log("Mock API: Soru silindi ID ->", id);
    }

    config.adapter = async () => ({
      data: {},
      status: 200,
      statusText: "Deleted",
      headers: {},
      config
    });
  }


  // --- PUT (Güncelleme) ---
  if (method === "put" && url.includes("/questions/")) {
    const id = Number(url.split("/").pop());
    const body = typeof data === 'string' ? JSON.parse(data) : data;

    // İlgili soruyu bul ve güncelle
    questions = questions.map(q => q.id === id ? { ...q, ...body } : q);

    setData(questions);
    console.log("Mock API: Soru güncellendi ID ->", id);

    config.adapter = async () => ({
      data: body,
      status: 200,
      statusText: "Updated",
      headers: {},
      config
    });
  }

  return config;
});

