import CurrencyFormatter from "../../util/CurrencyFormatter";

export default function CheckoutItem({ product }) {
  return (
    <li className="checkout-item">
      <div className="product-image__wrapper">
        <img
          src={product.image.src}
          alt={product.title}
          width={product.image.width}
          height={product.image.height}
          className="product-image"
        />
        <span className="count-bubble checkout-item__count">
          {product.quantity}
        </span>
      </div>
      <div className="checkout-item__info">
        <h3 className="product-title">{product.title}</h3>
        <p className="subtotal">
          {CurrencyFormatter.format(product.quantity * Number(product.price))}
        </p>
      </div>
    </li>
  );
}
