export function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto py-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full border text-sm ${
            selected === cat
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
