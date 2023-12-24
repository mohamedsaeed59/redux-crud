import { Routes, Route } from "react-router-dom";
import Users from "./components/Users";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/createuser" element={<CreateUser />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
