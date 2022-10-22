import React from "react";
import { Outlet } from "react-router-dom";

const RootTemplate = () => {
  return (
    <div>
      RootTemplate
      <Outlet />
    </div>
  );
};

export default RootTemplate;
