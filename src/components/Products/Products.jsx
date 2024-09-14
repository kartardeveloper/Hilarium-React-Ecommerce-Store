import useFetch from "../../hooks/useFetch";
import ProductItem from "./ProductItem";

const requestConfig = { method: "GET" };

export default function Products() {
  const {
    data: products,
    isFetching,
    error,
  } = useFetch("https://hilarium-react-ecommerce-store.onrender.com/products", requestConfig, []);

  if (isFetching) {
    return <p className="text-center loading-text">Loading Products...</p>;
  }

  return (
    <section>
      <div className="container">
        <ul className="products-list">
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </ul>
      </div>
    </section>
  );
}
