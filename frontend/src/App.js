import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./views/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
