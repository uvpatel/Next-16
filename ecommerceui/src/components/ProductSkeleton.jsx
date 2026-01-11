export function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-white p-4 rounded-xl border shadow-sm">
      <div className="w-full h-40 bg-gray-300 rounded-lg"></div>
      <div className="h-4 bg-gray-300 rounded mt-4 w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
      <div className="h-10 bg-gray-300 rounded mt-4"></div>
    </div>
  );
}
