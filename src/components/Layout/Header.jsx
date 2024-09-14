import { useContext } from "react";
import FavouriteIcon from "../Icons/FavouriteIcon";
import ShoppingCart from "../Icons/ShoppingCart";
import Button from "../UI/Button";
import CartContext from "../../store/CartContext";
import WishlistContext from "../../store/WishlistContext";
import UserProgressContext from "../../store/UserProgressContext";

export default function Header() {
  const cartContext = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { openWishlistModal, openCartModal, openOrdersModal } =
    useContext(UserProgressContext);

  const cartItemsCount = cartContext.items.reduce(
    (totalCount, item) => totalCount + item.quantity,
    0
  );

  const wishlistItemsCount = wishlistItems.length;

  return (
    <header className="site-header">
      <div className="header-blocks container">
        <div className="header-block__logo">
          <img
            src="./hilarium-creations-logo.webp"
            alt="Hila Creations Logo"
            className="header-logo"
          />
        </div>
        <div className="header-block__icons">
          <Button textOnly className="header-icon" onClick={openWishlistModal}>
            <FavouriteIcon />
            <span>Wishlist</span>
            <span className="count-bubble wishlist-count">
              {wishlistItemsCount}
            </span>
          </Button>
          <Button textOnly className="header-icon" onClick={openCartModal}>
            <ShoppingCart />
            <span>Cart</span>
            <span className="count-bubble">{cartItemsCount}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
