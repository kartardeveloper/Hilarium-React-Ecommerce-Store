import { useState } from "react";

export default function useQuantity(defaultValue) {
  const [quantity, setQuantity] = useState(defaultValue);

  function quantityIncreaseHandler() {
    setQuantity((prevQuantity) => {
      return prevQuantity + 1;
    });
  }

  function quantityDecreaseHandler() {
    setQuantity((prevQuantity) => {
      if (prevQuantity <= 1) {
        return 1;
      } else {
        return prevQuantity - 1;
      }
    });
  }

  function quantityInputChange(event) {
    setQuantity(Number(event.target.value));
  }

  return {
    quantity,
    quantityIncreaseHandler,
    quantityDecreaseHandler,
    quantityInputChange,
    setQuantity
  };
}
