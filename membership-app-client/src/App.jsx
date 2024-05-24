import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/home/Home";
import Registration from "./components/registration/Registration";
import EditMember from "./components/edit/EditMember";

function App() {
  return (
    <div className="px-5 md:px-16 lg:px-32 xl:px-[15rem] pb-5">
      <Navbar />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/edit" element={<EditMember />} />
      </Routes>
    </div>
  );
}

export default App;
