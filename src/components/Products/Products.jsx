import useFetch from "../../hooks/useFetch";
import ProductItem from "./ProductItem";

const requestConfig = { method: "GET" };

export default function Products() {
  const {
    data: products,
    isFetching,
    error,
  } = useFetch("http://localhost:3000/products", requestConfig, []);

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
