import axios from "axios";

const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

export const searchImagesByParams = async (query, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&page=${page}&orientation=landscape&per_page=12`
  );
  return response;
};
