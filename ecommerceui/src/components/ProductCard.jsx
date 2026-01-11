import { Button } from "./Button";
import { Price } from "./Price";
import { Rating } from "./Rating";

export function ProductCard({ title, image, price, discount, rating }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />

      <h3 className="text-lg font-semibold mt-3 text-gray-900">{title}</h3>

      <Rating value={rating} />

      <Price value={price} discount={discount} />

      <Button className="w-full mt-3">Add to Cart</Button>
    </div>
  );
}
