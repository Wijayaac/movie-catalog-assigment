import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getMovie = async (id) => {
  let { data } = await axios.get(`${API_URL}/movies/${id}`);

  return data;
};

export { getMovie };
