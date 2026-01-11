import { Navbar } from "./components/Navbar";
import { ProductGrid } from "./components/ProductGrid";
import { Container } from "./components/Container";
import products from "./data/products.json";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <Container>
        <h2 className="text-2xl font-bold my-6">Featured Products</h2>
        <ProductGrid products={products} />
      </Container>
    </div>
  );
}

export default App;
