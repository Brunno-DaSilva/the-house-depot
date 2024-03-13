import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faToolbox, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section className="sidebar__links">
        <NavLink to="/my-products">
          <FontAwesomeIcon className="sidebar-icon" icon={faToolbox} />
          <p>Products</p>
        </NavLink>
        <NavLink to="/new-product-form">
          <FontAwesomeIcon className="sidebar-icon" icon={faPlus} />
          <p>Add New Products</p>
        </NavLink>
      </section>
      <section className="sidebar__settings">
        <NavLink exact to="/settings">
          <FontAwesomeIcon className="navbar-icon" icon={faCog} />
          Settings
        </NavLink>
      </section>
    </aside>
  );
};
