import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Header from "./components/Layout/Header";
import Products from "./components/Products/Products";
import Wishlist from "./components/Wishlist";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import { WishlistContextProvider } from "./store/WishlistContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <Header />
          <Products />
          <Wishlist />
          <Cart />
          <Checkout />
        </WishlistContextProvider>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
