import React from "react";
import { BsCart2 } from "react-icons/bs";

const Cart = () => {
  return (
    <button>
      <BsCart2
        size={25}
        className="text-gray-500 hover:text-primary cursor-pointer"
      />
    </button>
  );
};

export default Cart;
