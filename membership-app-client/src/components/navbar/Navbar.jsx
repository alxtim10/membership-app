import { useState } from "react";
import ModalNavbar from "./ModalNavbar";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const tabs = [
    {
      label: "Home",
      description: "alxmembership homepage",
      link: "/",
    },
    {
      label: "Registration",
      description: "Registration new member",
      link: "/registration",
    },
  ];
  return (
    <>
      <header className="bg-white text-blue-700 flex flex-wrap items-center py-4">
        <div className="flex-1 flex justify-between items-center">
          <h1
            onClick={() => {
              navigate(`/`);
            }}
            href="#"
            className="text-xl font-bold  cursor-pointer"
          >
            alxmembership
          </h1>
        </div>

        <label
          htmlFor="menu-toggle"
          onClick={() => {
            setShow((prev) => !prev);
          }}
          className="pointer-cursor md:hidden block"
        >
          <svg
            className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

        <div
          className="hidden md:flex md:items-center md:w-auto w-full"
          id="menu"
        >
          <nav>
            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
              {tabs.map((data, i) => {
                return (
                  <li
                    onClick={() => {
                      navigate(`${data.link}`);
                    }}
                    key={i}
                  >
                    <a className="md:p-4 py-3 px-0 block" href="#">
                      {data.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <ModalNavbar show={show} setShow={setShow} tabs={tabs} />
    </>
  );
};

export default Navbar;
