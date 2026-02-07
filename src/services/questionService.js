import "./mockBackend"; 
import { api } from "./api";


export const fetchQuestions = () => {
  return api.get("/questions");
};

export const createQuestion = (data) => {
  return api.post("/questions", data);
};

export const removeQuestion = (id) => {
  return api.delete(`/questions/${id}`);
};