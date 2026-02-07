import { api } from "./api";

const STORAGE_KEY = "devprep_questions";

// LocalStorage'dan veri okuyan yardımcı fonksiyon
const getData = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
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

  return config;
});