import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AddSchool from "./pages/AddSchool";
import ShowSchools from "./pages/ShowSchools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  return (
    <>
      <Hero />
      {/* You can add more sections here later */}
      <section className="container py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3>Browse Schools</h3>
            <p>Find schools by city, board and type.</p>
            <Link to="/schools" className="btn">Explore</Link>
          </div>
          <div className="card">
            <h3>Add Your School</h3>
            <p>Admins can submit details and images.</p>
            <Link to="/add-school" className="btn">Add School</Link>
          </div>
        
        </div>
      </section>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/add-school" element={<AddSchool />} />
        <Route path="/schools" element={<ShowSchools />} />
        <Route path="*" element={<Home />} />
      </Routes>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </BrowserRouter>
  );
}
