import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Manager from "../pages/Manager";
// import AnimeInfo from "../pages/AnimeInfo";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/manager" element={<Manager />} />
    </Routes>
  );
};

export default AppRouter;
