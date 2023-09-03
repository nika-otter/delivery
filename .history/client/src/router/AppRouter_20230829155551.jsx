import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
// import AnimeInfo from "../pages/AnimeInfo";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
    </Routes>
  );
};

export default AppRouter;
