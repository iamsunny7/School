import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CITIES = ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai", "Kolkata", "Pune"];


export default function Hero() {
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams({ q, city, board, type });
    navigate(`/schools?${params.toString()}`);
  }

  return (
    <section className="hero-bg">
      <div className="container text-center py-20 md:py-28">
        <h2 className="text-white text-3xl md:text-5xl font-extrabold leading-tight">
          FIND THE BEST SCHOOL FOR YOUR CHILD
        </h2>

        <form onSubmit={handleSearch} className="mt-8 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by school name or locality"
            className="input flex-1"
          />
          <select className="input" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Choose City</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
         
          <button className="btn" type="submit">Search</button>
        </form>
      </div>
    </section>
  );
}
