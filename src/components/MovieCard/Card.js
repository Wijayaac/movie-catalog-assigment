import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Card.module.scss";

const Card = (props) => {
  const { movie } = props;
  return (
    <div className={style.card}>
      <div className={style.poster}>
        <img src={movie.poster_path} alt={movie.title} />
      </div>
      <div className={style.copy}>
        <p className={style.title}>{movie.title ? movie.title : "No Name"}</p>
        <p className={style.rating}>
          Rating : {movie.rating ? movie.rating : "No Rating"}
        </p>
        <NavLink to={`/movies/${movie.id}`}>Show Details</NavLink>
      </div>
    </div>
  );
};

export default Card;
