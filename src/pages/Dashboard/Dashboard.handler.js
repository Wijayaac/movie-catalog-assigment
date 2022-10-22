import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const formatPagination = (link, currentPage) => {
  return link
    .split(",")
    .map((link) => link.split(";"))
    .map((content) => {
      let page = content[0]
        .replace(/<[a-zA-Z]+:\/\/[a-zA-Z]+:3004\/[a-zA-Z]+\?_[a-zA-Z]+=/i, "")
        .replace(/&_[a-zA-Z]+=8>/, "")
        .replace(" ", "");
      return {
        page: page,
        text: content[1].replace(/ [a-zA-Z]+="/, "").replace(/"/, ""),
        disabled: parseInt(page) === currentPage,
      };
    });
};

const getMovies = async (page) => {
  let res = await axios.get(`${API_URL}/movies?_page=${page}&_limit=8`);

  let links = formatPagination(res.headers.link, page);

  return {
    data: res.data,
    links,
  };
};

const searchMovies = async (val) => {
  let res = await axios.get(`${API_URL}/movies?title_like=${val}`);
  return {
    data: res.data,
  };
};

export { getMovies, searchMovies };
