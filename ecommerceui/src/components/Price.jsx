export function Price({ value, discount }) {
  const discountPrice = discount ? value - (value * discount) / 100 : value;

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-semibold text-black">₹{discountPrice}</span>
      {discount && (
        <>
          <span className="line-through text-gray-500 text-sm">₹{value}</span>
          <span className="text-green-600 text-sm">{discount}% off</span>
        </>
      )}
    </div>
  );
}
