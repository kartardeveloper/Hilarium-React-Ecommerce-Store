import { useContext, useState } from "react";
import Modal from "../Layout/Modal";
import UserProgressContext from "../../store/UserProgressContext";
import Input from "../UI/Input";
import CheckoutItem from "./CheckoutItem";
import CartContext from "../../store/CartContext";
import Button from "../UI/Button";
import CurrencyFormatter from "../../util/CurrencyFormatter";
import useFetch from "../../hooks/useFetch";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const getRequestConfig = {
  method: "GET",
};

export default function Checkout() {
  const [fillAddress, setFillAddress] = useState(false);
  const {
    userProgress,
    closeCheckoutModal,
    openOrderSuccessModal,
    closeOrderSuccessModal,
  } = useContext(UserProgressContext);
  const { items: products, clearCart } = useContext(CartContext);
  const {
    data,
    isFetching: isSending,
    error,
    sendRequest,
    clearData,
  } = useFetch("http://localhost:3000/order", requestConfig, "");

  const { sendRequest: sendAddress } = useFetch(
    "http://localhost:3000/address",
    requestConfig,
    ""
  );

  const { data: address } = useFetch(
    "http://localhost:3000/user-address",
    getRequestConfig,
    {}
  );

  const totalPrice = products.reduce(
    (total, product) => product.quantity * Number(product.price) + total,
    0
  );

  function useAddressInputHandler(event) {
    setFillAddress(event.target.checked);
  }

  let checkboxInput = (
    <Input
      label="Save my information for a faster checkout next time"
      id="save-address"
      type="checkbox"
    />
  );
  if (address?.name) {
    checkboxInput = (
      <Input
        label="Use saved address"
        id="use-address"
        type="checkbox"
        onChange={useAddressInputHandler}
      />
    );
  }

  function orderSubmitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const customerData = Object.fromEntries(formData.entries());
    const orderData = {
      order: {
        items: products,
        customer: customerData,
      },
    };
    sendRequest(orderData);
    event.target.reset();
    setFillAddress(false);
    if (formData.get("save-address") === "on") {
      sendAddress(customerData);
    }
  }

  function handleFinish() {
    clearCart();
    clearData();
    closeOrderSuccessModal();
  }

  if (data && !error) {
    return (
      <Modal
        heading=""
        className="order-success"
        open={userProgress === "CHECKOUT"}
        closeFn={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <div className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      heading="Checkout"
      className="checkout"
      open={userProgress === "CHECKOUT"}
      closeFn={userProgress === "CHECKOUT" ? closeCheckoutModal : null}
    >
      <div className="checkout-inner">
        <form onSubmit={orderSubmitHandler}>
          <div className="checkout-blocks">
            <div className="checkout-block__form">
              <Input
                label="Full Name"
                id="name"
                type="text"
                required
                defaultValue={fillAddress ? address.name : ""}
              />
              <Input
                label="Email"
                id="email"
                type="email"
                required
                defaultValue={fillAddress ? address.email : ""}
              />
              <Input
                label="Street"
                id="street"
                type="text"
                required
                defaultValue={fillAddress ? address.street : ""}
              />
              <div className="field-row">
                <Input
                  label="Postal Code"
                  id="postal-code"
                  type="text"
                  required
                  defaultValue={fillAddress ? address["postal-code"] : ""}
                />
                <Input
                  label="City"
                  id="city"
                  type="text"
                  required
                  defaultValue={fillAddress ? address.city : ""}
                />
              </div>
              {checkboxInput}
            </div>
            <div className="checkout-block__products">
              <h3>Products</h3>
              <ul className="products-list">
                {products.map((product) => {
                  return <CheckoutItem key={product.id} product={product} />;
                })}
              </ul>
            </div>
          </div>
          <div className="checkout-footer">
            <p>Total: {CurrencyFormatter.format(totalPrice)}</p>
            <div className="checkout-actions">
              <Button
                onClick={
                  userProgress === "CHECKOUT" ? closeCheckoutModal : null
                }
                type="button"
              >
                Continue Shopping
              </Button>
              <Button type="submit">
                {isSending ? "Submitting Order..." : "Submit Order"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
