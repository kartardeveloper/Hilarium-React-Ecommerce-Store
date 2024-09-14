import Button from "../UI/Button";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";
import useQuantity from "../../hooks/useQuantity";
import { useContext, useEffect } from "react";
import CartContext from "../../store/CartContext";
import CurrencyFormatter from "../../util/CurrencyFormatter";

export default function CartItem({ product }) {
  const { addItem, removeItem } = useContext(CartContext);
  const {
    quantity,
    quantityIncreaseHandler,
    quantityDecreaseHandler,
    quantityInputChange,
    setQuantity,
  } = useQuantity(product.quantity);

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  function onIncrease() {
    addItem(product, 1);
    quantityIncreaseHandler();
  }

  function onDecrease() {
    removeItem(product, quantity);
    quantityDecreaseHandler();
  }

  return (
    <li className="cart-item">
      <div className="cart-item__info">
        <div className="product-image__wrapper">
          <img
            src={product.image.src}
            alt={product.title}
            width={product.image.width}
            height={product.image.height}
            className="product-image"
          />
        </div>
        <h3 className="product-title">{product.title}</h3>
      </div>
      <div className="cart-item__quantity">
        <div className="quantity-wrapper">
          <Button textOnly className="quantity-button" onClick={onDecrease}>
            <MinusIcon />
          </Button>
          <input
            type="number"
            name="quantity"
            className="quantity"
            value={quantity}
            onChange={quantityInputChange}
            min={1}
            max={100}
            readOnly
          />
          <Button textOnly className="quantity-button" onClick={onIncrease}>
            <PlusIcon />
          </Button>
        </div>
      </div>
      <div className="cart-item__price">
        <p className="product-price__wrapper">
          <span className="product-price">
            {CurrencyFormatter.format(Number(product.price))}
          </span>
          <span className="product-compare-price">
            {CurrencyFormatter.format(Number(product.compare_at_price))}
          </span>
        </p>
      </div>
      <div className="cart-item__subtotal">
        <p className="subtotal">
          {CurrencyFormatter.format(product.quantity * Number(product.price))}
        </p>
      </div>
    </li>
  );
}
