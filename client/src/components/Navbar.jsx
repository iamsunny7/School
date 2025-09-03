import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) =>
    "px-4 py-2 rounded-lg hover:bg-slate-100 md:hover:bg-transparent md:hover:text-primary " +
    (isActive ? "text-primary font-semibold" : "text-slate-700");

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
      <nav className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary" />
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="text-primary">School</span>
            <span className="text-secondary">Finder</span>
          </h1>
        </Link>

        <button
          className="md:hidden p-2 rounded-lg border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      
        {/* <div className={`flex flex-row  md:items-center gap-4 ${open ? "block" : "hidden"} md:block`}> */}
        <div className="flex gap-4 font-semibold">
          <div className="btn-outline"><NavLink to="/" className={navClass}>Home</NavLink></div>
          <div className="btn-outline"><NavLink to="/schools" className={navClass}>Find Schools</NavLink></div>
          <div className="btn-outline"><NavLink to="/add-school" className={navClass}>Add School</NavLink></div>
          
        </div>
        
      </nav>
    </header>
  );
}
