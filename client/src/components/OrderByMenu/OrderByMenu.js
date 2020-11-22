import { useState } from "react";

const OrderByMenu = () => {
  const [isOpen, isOpenFunction] = useState(false);
  return (
    <div>
      <button
        className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-green-900 text-white mt-4"
        onClick={() => isOpenFunction(!isOpen)}
        aria-label="order-by menu"
      >
        Order By{" "}<i className="fas fa-angle-down text-white"></i>
      </button>
      {isOpen && (
        <div
          className="z-10 absolute mt-16 right-0 py-2 w-48 bg-gray-800 rounded-lg shadow-xl top-12 rounded-md border-solid border-4 border-gray-600"
          onBlur={() => isOpenFunction(!isOpen)}
        >
          <button>Order by Asc</button>
          <button>Order by Desc</button>
          <button>Order by Date</button>
        </div>
      )}
    </div>
  );
};

export default OrderByMenu;
