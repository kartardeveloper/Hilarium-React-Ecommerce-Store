import CurrencyFormatter from "../../util/CurrencyFormatter.js";
import Button from "../UI/Button.jsx";
import MinusIcon from "../Icons/MinusIcon.jsx";
import PlusIcon from "../Icons/PlusIcon.jsx";
import { useContext, useState } from "react";
import CartContext from "../../store/CartContext.jsx";
import FavouriteIcon from "../Icons/FavouriteIcon.jsx";
import WishlistContext from "../../store/WishlistContext.jsx";
import useFetch from "../../hooks/useFetch.js";
import truncateString from "../../util/truncateString.js";
import useQuantity from "../../hooks/useQuantity.js";

const requestConfig = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function ProductItem({ product, truncateDescription }) {
  const cartContext = useContext(CartContext);
  const wishlistContext = useContext(WishlistContext);

  const { data, isFetching, error, sendRequest } = useFetch(
    `http://localhost:3000/wishlist`,
    requestConfig,
    ""
  );

  const {
    quantity,
    quantityIncreaseHandler,
    quantityDecreaseHandler,
    quantityInputChange,
  } = useQuantity(1);

  const isWishlisted = wishlistContext.wishlistItems.find(
    (wishlistItem) => wishlistItem.id === product.id
  );

  function wishlistHandler(product) {
    if (!isWishlisted) {
      wishlistContext.addItemInWishlist(product);
    } else {
      wishlistContext.removeItemFromWishlist(product.id);
    }
    sendRequest(product);
  }

  let productDescription = product.description;

  if (truncateDescription) {
    productDescription = truncateString(productDescription, 12);
  }

  return (
    <li className="product-item">
      <div className="product-image__wrapper">
        <img
          src={product.image.src}
          alt={product.title}
          width={product.image.width}
          height={product.image.height}
          className="product-image"
        />
        <Button
          textOnly
          className="wishlist-button"
          onClick={() => wishlistHandler(product)}
        >
          <FavouriteIcon
            color={isWishlisted ? "#f94c43" : "#000000"}
            fill={isWishlisted ? "#f94c43" : "#ffffff"}
          />
        </Button>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{productDescription}</p>
        <p className="product-price__wrapper">
          <span className="product-price">
            {CurrencyFormatter.format(Number(product.price))}
          </span>
          <span className="product-compare-price">
            {CurrencyFormatter.format(Number(product.compare_at_price))}
          </span>
        </p>
        <div className="product-actions">
          <div className="quantity-wrapper">
            <Button
              textOnly
              className="quantity-button"
              onClick={quantityDecreaseHandler}
            >
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
            />
            <Button
              textOnly
              className="quantity-button"
              onClick={quantityIncreaseHandler}
            >
              <PlusIcon />
            </Button>
          </div>
          <Button onClick={() => cartContext.addItem(product, quantity)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </li>
  );
}
