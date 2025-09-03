export default function SchoolCard({ school }) {
  return (
    <article className="card">
      {/* Uniform 16:9 image area */}
      <div className="media aspect-video">
        {school.image ? (
          <img
             src={school.image}
            alt={school.name}
            loading="lazy"
          />
        ) : (
          <div className="media" />
        )}
      </div>

      {/* Content */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold line-clamp-1">{school.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">{school.address}</p>
        <p className="text-sm mt-1">
          <span className="font-medium">City:</span> {school.city}
        </p>
      </div>
    </article>
  );
}
