import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.payload.item.id
    );

    const updatedItems = [...state.items];

    if (existingItemIndex >= 0) {
      const existingItem = [...state.items][existingItemIndex];
      let updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.payload.quantity,
      };
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        quantity: action.payload.quantity,
        ...action.payload.item,
      });
    }
    return { ...state, items: updatedItems };
  } else if (action.type === "REMOVE_ITEM") {
    let previousItems = [...state.items];
    if (action.payload.quantity === 1) {
      const updatedItems = previousItems.filter(
        (item) => item.id !== action.payload.item.id
      );
      return { ...state, items: updatedItems };
    } else {
      const existingItemIndex = previousItems.findIndex(
        (item) => item.id === action.payload.item.id
      );
      const newItem = {
        ...previousItems[existingItemIndex],
        quantity: action.payload.quantity - 1,
      };
      previousItems[existingItemIndex] = newItem;
      return { ...state, items: previousItems };
    }
  } else if (action.type === "CLEAR_CART") {
    return { items: [] };
  }
}

export function CartContextProvider({ children }) {
  const [state, cartDispatchAction] = useReducer(cartReducer, {
    items: [],
  });

  function addItem(item, quantity) {
    cartDispatchAction({
      type: "ADD_ITEM",
      payload: {
        item,
        quantity,
      },
    });
  }

  function removeItem(item, quantity) {
    cartDispatchAction({
      type: "REMOVE_ITEM",
      payload: {
        item,
        quantity,
      },
    });
  }

  function clearCart() {
    cartDispatchAction({
      type: "CLEAR_CART",
    });
  }

  const cartContextValue = {
    items: state.items,
    addItem,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
