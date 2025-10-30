"use client";
import { useDispatch } from "react-redux";
import { changeQty, removeItem } from "../../services/reducers/cartReducer";
import Quantity from "../../components/atoms/Quantity";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  return (
    <div className="py-6 flex flex-col sm:flex-row gap-4">
      <div className="flex items-start gap-4 flex-1">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-muted mt-1">Elegant handcrafted piece.</p>
          <button
            onClick={() => dispatch(removeItem(item.id))}
            className="mt-2 text-sm text-primary"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="flex sm:items-end justify-between gap-4">
        <Quantity
          value={item.qty}
          onChange={(q) => dispatch(changeQty({ id: item.id, qty: q }))}
        />
        <p className="font-bold">${(item.price * item.qty).toFixed(2)}</p>
      </div>
    </div>
  );
}
