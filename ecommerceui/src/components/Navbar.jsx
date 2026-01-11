import { Button } from "./Button";
import { NavLink } from "react-router";
export function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold">ShopMate</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg px-3 py-2 text-sm w-60 focus:ring-2 focus:ring-black"
        />


        <Button variant="secondary">Login</Button>
      </div>
    </nav>
  );
}
