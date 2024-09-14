import { useContext } from "react";
import Modal from "../Layout/Modal";
import UserProgressContext from "../../store/UserProgressContext";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";
import CurrencyFormatter from "../../util/CurrencyFormatter";
import Button from "../UI/Button";

export default function Cart() {
  const { userProgress, closeCartModal, openCheckoutModal } =
    useContext(UserProgressContext);
  const { items: cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, cartItem) => cartItem.quantity * Number(cartItem.price) + total,
    0
  );

  function checkoutClickHandler() {
    closeCartModal();
    openCheckoutModal();
  }

  return (
    <Modal
      heading="My Cart"
      className="cart"
      open={userProgress === "CART"}
      closeFn={userProgress === "CART" ? closeCartModal : null}
    >
      {cartItems.length === 0 ? (
        <p className="fallback-text">Your cart is empty!</p>
      ) : (
        <div className="cart-inner">
          <div className="cart-data">
            <div className="cart-items__header">
              <h4>Product</h4>
              <h4>Quantity</h4>
              <h4>Price</h4>
              <h4>Subtotal</h4>
            </div>
            <ul className="products-list">
              {cartItems.map((cartItem) => {
                return <CartItem key={cartItem.id} product={cartItem} />;
              })}
            </ul>
          </div>
          <div className="cart-actions">
            <p>Total: {CurrencyFormatter.format(totalPrice)}</p>
            <Button onClick={checkoutClickHandler} type="button">
              Checkout
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
