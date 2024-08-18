import { Link, useLocation } from "react-router-dom";

import "../styles/menu.css";
const Menu = () => {
  const { pathname } = useLocation();
  console.log(location.pathname);
  return (
    <ul className="menu">
      <li>
        <Link
          className={`menu__item ${pathname === "/" ? "menu__item--active" : ""}`}
          to="/"
        >
          Home
        </Link>
      </li>
      <li>
        <Link className={`menu__item ${pathname === "/desktop" ? "menu__item--active" : ""}`} to="/desktop">
          Desktop
        </Link>
      </li>
      <li>
        <Link
          className={`menu__item ${pathname === "/blockchain" ? "menu__item--active" : ""}`}
          to="/blockchain"
        >
          Blockchain
        </Link>
      </li>
    </ul>
  );
};

export default Menu;