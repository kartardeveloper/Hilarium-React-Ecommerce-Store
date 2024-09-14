import { createContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const requestConfig = {
  method: "GET",
};

const WishlistContext = createContext({
  wishlistItems: [],
  addItemInWishlist: () => {},
  removeItemFromWishlist: () => {},
});

export function WishlistContextProvider({ children }) {
  const { data: wishlist } = useFetch(
    "https://hilarium-react-ecommerce-store.onrender.com/wishlist",
    requestConfig,
    []
  );

  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems(wishlist);
  }, [wishlist]);

  function addItemInWishlist(item) {
    setWishlistItems((prevWishlistItems) => {
      return [...prevWishlistItems, item];
    });
  }

  function removeItemFromWishlist(itemId) {
    const filteredWishlistItems = wishlistItems.filter(
      (wishlistItem) => wishlistItem.id !== itemId
    );
    setWishlistItems(filteredWishlistItems);
  }

  const wishlistContextValue = {
    wishlistItems,
    addItemInWishlist,
    removeItemFromWishlist,
  };

  return (
    <WishlistContext.Provider value={wishlistContextValue}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
