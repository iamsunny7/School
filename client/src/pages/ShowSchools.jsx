import { useEffect, useMemo, useState } from "react";
import SchoolCard from "../components/SchoolCard";
import { useLocation } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const { search } = useLocation();

 useEffect(() => {
  fetch(`${BASE_URL}/api/schools`)
    .then((res) => res.json())
    .then((data) => setSchools(data));
}, []);


  const filters = useMemo(() => Object.fromEntries(new URLSearchParams(search)), [search]);

  const filtered = useMemo(() => {
    const q = (filters.q || "").toLowerCase();
    const city = (filters.city || "").toLowerCase();
    const board = (filters.board || "").toLowerCase();
    const type = (filters.type || "").toLowerCase();

    return schools.filter((s) => {
      const matchesQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.state.toLowerCase().includes(q);
      const matchesCity = !city || s.city.toLowerCase() === city;
      // board/type are placeholders for future backend fields
      const matchesBoard = !board;
      const matchesType = !type;
      return matchesQ && matchesCity && matchesBoard && matchesType;
    });
  }, [schools, filters]);

  return (
    <section className="container py-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Schools</h2>
          <p className="text-slate-600">Showing {filtered.length} result(s)</p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-slate-600">
          No schools yet. Add one from <span className="font-semibold">Add School</span>.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((s) => (
            <SchoolCard key={s.id} school={s} />
          ))}
        </div>
      )}
    </section>
  );
}
