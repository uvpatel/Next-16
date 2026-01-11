export function Badge({ children, color = "red" }) {
  const colors = {
    red: "bg-red-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    yellow: "bg-yellow-500",
  };

  return (
    <span
      className={`${colors[color]} text-white text-xs px-2 py-1 rounded-full`}
    >
      {children}
    </span>
  );
}
