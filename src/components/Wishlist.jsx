import { useContext } from "react";
import Modal from "./Layout/Modal";
import ProductItem from "./Products/ProductItem";
import WishlistContext from "../store/WishlistContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Wishlist() {
  const { wishlistItems: products } = useContext(WishlistContext);
  const { userProgress, closeWishlistModal } = useContext(UserProgressContext);

  return (
    <Modal
      heading="My Wishlist"
      className="wishlist"
      open={userProgress === "WISHLIST"}
      closeFn={closeWishlistModal}
    >
      {products.length === 0 ? (
        <p className="fallback-text">Your wishlist is empty!</p>
      ) : (
        <div className="products-list">
          {products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                product={product}
                truncateDescription
              />
            );
          })}
        </div>
      )}
    </Modal>
  );
}
