import { createContext, useState } from "react";

const UserProgressContext = createContext({
  userProgress: "",
  openWishlistModal: () => {},
  closeWishlistModal: () => {},
  openCartModal: () => {},
  closeCartModal: () => {},
  openCheckoutModal: () => {},
  closeCheckoutModal: () => {},
  openOrdersModal: () => {},
  closeOrdersModal: () => {},
  openOrderSuccessModal: () => {},
  closeOrderSuccessModal: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function openWishlistModal() {
    setUserProgress("WISHLIST");
  }

  function closeWishlistModal() {
    setUserProgress("");
  }

  function openCartModal() {
    setUserProgress("CART");
  }

  function closeCartModal() {
    setUserProgress("");
  }

  function openCheckoutModal() {
    setUserProgress("CHECKOUT");
  }

  function closeCheckoutModal() {
    setUserProgress("");
  }

  function openOrdersModal() {
    setUserProgress("ORDERS");
  }

  function closeOrdersModal() {
    setUserProgress("");
  }

  function openOrderSuccessModal() {
    setUserProgress("ORDER_SUCCESS");
  }

  function closeOrderSuccessModal() {
    setUserProgress("");
  }

  const userProgressContextValue = {
    userProgress,
    openWishlistModal,
    closeWishlistModal,
    openCartModal,
    closeCartModal,
    openCheckoutModal,
    closeCheckoutModal,
    openOrdersModal,
    closeOrdersModal,
    openOrderSuccessModal,
    closeOrderSuccessModal,
  };

  console.log(userProgress);

  return (
    <UserProgressContext.Provider value={userProgressContextValue}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
