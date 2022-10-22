import debounce from "lodash.debounce";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { getMovies, searchMovies } from "./Dashboard.handler";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [links, setLinks] = useState([]);
  const { register, reset } = useForm();

  useEffect(() => {
    const getData = async () => {
      try {
        let { data, links } = await getMovies(1);
        if (data.length > 0) {
          setMovies(data);
          toast.success("Success get movies");
        }
        setLinks(links);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, []);

  const handlePagination = async (page) => {
    reset();
    try {
      let { data, links } = await getMovies(page);
      if (data.length > 0) {
        setMovies(data);
        toast.success(`Showing movies on page ${page}`);
      }
      setLinks(links);
    } catch (error) {
      toast.error(error);
    }
  };
  const handleChange = debounce(async (e) => {
    let searchQuery = e.target.value;
    try {
      let { data } = await searchMovies(searchQuery);
      if (data.length > 0) {
        setMovies(data);
        toast.success(`Search results for : ${searchQuery} `);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, 800);

  return (
    <div>
      <div className='movie-search'>
        <form>
          <input
            type='text'
            {...register("title_like")}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className='movie-list'>
        {movies &&
          movies.map((movie, key) => (
            <div key={key}>
              <img src={movie.poster_path} alt={movie.title} />
              <p>{movie.title}</p>
              <p>{movie.rating}</p>
              <NavLink to={`/movies/${movie.id}`}>Show Details</NavLink>
            </div>
          ))}
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
