import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";

function Home() {
  return <h2>Home</h2>;
}

function Login() {
  return <h2>Login Page</h2>;
}

function Admin() {
  return <h2>Admin Page</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ display: "flex", gap: 10, padding: 10 }}>
        <Link to="/">Home</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
