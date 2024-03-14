import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faToolbox, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <section className="sidebar__links">
        <NavLink className="sidebar__link" to="/my-products">
          <FontAwesomeIcon className="sidebar-icon" icon={faToolbox} />
          <span>Products</span>
        </NavLink>
        <NavLink className="sidebar__link" to="/new-product-form">
          <FontAwesomeIcon className="sidebar-icon" icon={faPlus} />
          <span>Add New Products</span>
        </NavLink>
      </section>
      <section className="sidebar__settings">
        <NavLink exact to="/settings">
          <FontAwesomeIcon className="sidebar-icon" icon={faCog} />
          <span>Settings</span>
        </NavLink>
      </section>
    </aside>
  );
};
