import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

import { MovieCard } from "../../components/MovieCard";
import { SearchMovie } from "../../components/SearchForm";
import { getMovies, searchMovies } from "./Dashboard.handler";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let { data, links } = await getMovies(1);
        if (data.length > 0) {
          setMovies(data);
          toast.success("Success get movies");
        }
        setLinks(links);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  const handlePagination = async (page) => {
    setIsLoading(true);
    try {
      let { data, links } = await getMovies(page);
      if (data.length > 0) {
        setMovies(data);
        toast.success(`Showing movies on page ${page}`);
      }
      setLinks(links);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = debounce(async (e) => {
    setIsLoading(true);
    let searchQuery = e.target.value;
    try {
      let { data } = await searchMovies(searchQuery);
      if (data.length > 0) {
        setMovies(data);
        toast.success(`Search results for : ${searchQuery} `);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  }, 800);

  return (
    <div>
      {isLoading && <LoaderIcon className='loader' />}
      <div className='movie-search'>
        <SearchMovie handleChange={handleChange} />
      </div>
      <div className='movie-list'>
        {movies &&
          movies.map((movie, key) => <MovieCard key={key} movie={movie} />)}
      </div>
      <div className='pagination'>
        {links &&
          links.map((link, key) => (
            <button
              key={key}
              className={link.disabled ? "disabled" : ""}
              onClick={() => handlePagination(link.page)}>
              {link.text}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
