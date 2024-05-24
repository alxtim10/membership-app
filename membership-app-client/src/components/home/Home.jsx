import { ToastContainer } from "react-toastify";
import Memberlist from "./Memberlist";

const Home = () => {
  return (
    <section>
      <ToastContainer />
      <div className="w-full">
        <img className="h-[20rem] w-full object-cover" src="/hero.jpg" alt="" />
      </div>
      <h1 className="text-3xl mt-14 text-center text-blue-700 font-bold">
        Membership List
      </h1>
      <Memberlist />
    </section>
  );
};

export default Home;
