import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getMovie } from "./MovieDetail.handler";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        let data = await getMovie(id);
        if (data) {
          setMovie(data);
          toast.success("Movie loaded");
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    getData();
  }, [id]);

  return (
    <div className='movie-detail'>
      {isLoading && <LoaderIcon />}
      <div className='movie-wrapper'>
        <div className='movie-poster'>
          <img
            src={`${movie.poster_path ? movie.poster_path : ""}`}
            alt={movie.title}
          />
        </div>
        <div className='movie-content'>
          <h1>{movie.title ? movie.title : "No Title"}</h1>
          <p className='date'>
            Released : {movie.release_date ? movie.release_date : "1999-10-12"}
          </p>
          <p className='rating'>Rating : {movie.rating ? movie.rating : 0}</p>
          <p className='description'>
            {movie.overview ? movie.overview : "No description"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
