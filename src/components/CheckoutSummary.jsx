import Image from "next/image";

const CheckoutSummary = ({ cartItems, totalPrice }) => {
  return (
    <div className="w-[400px] flex flex-col">
      {cartItems.length > 0 &&
        cartItems.map((cartItem) => (
          <div
            key={cartItem._id}
            className="w-full flex items-center justify-between"
          >
            <div className="flex gap-5 items-center">
              <Image
                src={cartItem.product.imageUrl[0]}
                alt="cart Item"
                width={60}
                height={45}
              />
              <p className="text-xs">{cartItem.product.title}</p>
            </div>
            <p>
              ${cartItem.product.discountedPrice}{" "}
              <span className="text-sm text-gray-600">
                ({cartItem.quantity})
              </span>
            </p>
          </div>
        ))}

      <div className="w-full flex items-center justify-between mt-5">
        <p>Subtotal</p>
        <p>${totalPrice}</p>
      </div>
      <hr className="border border-gray-600 mt-3" />
      <div className="w-full flex items-center justify-between mt-5">
        <p>Shipping</p>
        <p>Free</p>
      </div>
      <hr className="border border-gray-600 mt-3" />
      <div className="w-full flex items-center justify-between mt-5">
        <p>Total</p>
        <p>${totalPrice}</p>
      </div>
    </div>
  );
};

export default CheckoutSummary;
