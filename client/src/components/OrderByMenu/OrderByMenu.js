import { useState } from "react";

const OrderByMenu = ({ orderByAscending, orderByDescending }) => {
  const [isOpen, isOpenFunction] = useState(false);
  return (
    <div className="relative">
      <button
        className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-green-900 text-white mt-4"
        onClick={() => isOpenFunction(!isOpen)}
        aria-label="order-by menu"
      >
        Order By <i className="fas fa-angle-down text-white"></i>
      </button>
      {isOpen && (
        <div
          className="text-white z-10 absolute left-half py-2 w-48 bg-gray-800 rounded-lg shadow-xl rounded-md border-solid border-4 border-gray-600"
          onBlur={() => isOpenFunction(!isOpen)}
        >
          <button onClick={() => orderByAscending()}>Order by Asc</button>
          <button onClick={() => orderByDescending()}>Order by Desc</button>
        </div>
      )}
    </div>
  );
};

export default OrderByMenu;
