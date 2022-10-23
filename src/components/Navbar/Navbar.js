import React from "react";
import { NavLink } from "react-router-dom";

import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <header>
      <div className={style.wrapper}>
        <NavLink to='/'>
          <p className={style.logo}>Movie Repository</p>
          <p className={style.description}>See Movies</p>
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
