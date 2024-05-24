/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const ModalNavbar = ({ show, tabs, setShow }) => {
  const navigate = useNavigate();
  return (
    <section
      className={`${
        show ? "block" : "hidden"
      } absolute  mt-2 w-full shadow-lg rounded-md z-50 right-0 px-3`}
    >
      <div className="bg-[#dfdfdf] h-full w-full  rounded-md">
        <ul>
          {tabs.map((data, i) => {
            return (
              <li
                onClick={() => {
                  setShow((prev) => !prev);
                  navigate(`/${data.link}`);
                }}
                className="flex items-center justify-between p-5 h-20 hover:bg-[#d6d5d5] transition-all cursor-pointer rounded-md"
                key={i}
              >
                <div>
                  <h1 className="text-md font-bold">{data.label}</h1>
                  <h1 className="text-sm font-extralight">
                    {data.description}
                  </h1>
                </div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAY0lEQVR4nO3WsQmAQBQE0alCtP82LEC8Aq6cNVGMBfmDeAMbv3RhNLpbgR2YKC7nOrAYcKrxWHgsPBYeC4+Fx8Jj4Xmw9iu4A3M13N9GsVAsFAvFQrFQLBQLvc7eZpy90Tc7AOVMlyIBn0zEAAAAAElFTkSuQmCC"
                  alt="Vercel Logo"
                  width={15}
                  height={15}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default ModalNavbar;
