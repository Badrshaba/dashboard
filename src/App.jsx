import { Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<h3>Home</h3>} />
          <Route path="about" element={<h3>about</h3>} />
          <Route path="contact" element={<h3>contact</h3>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
