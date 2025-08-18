import { Minus, Plus, Trash2 } from 'lucide-react';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <div className="bg-[#1e293b] rounded-lg p-6 mb-4 shadow-lg">
      <div className="flex justify-between items-start">
        {/* Left side - Service details */}
        <div className="flex-1 pr-6">
          <h3 className="text-[#C49E5B] text-xl font-semibold mb-2">
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            {item.duration}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Right side - Controls and price */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Quantity controls */}
          {/* <div className="flex items-center bg-black rounded-full overflow-hidden"> */}
          {/*   <button */}
          {/*     onClick={() => onDecrement(item.id)} */}
          {/*     className="p-2 text-white hover:text-gray-300 transition-colors disabled:opacity-50" */}
          {/*     disabled={item.quantity <= 1} */}
          {/*   > */}
          {/*     <Minus size={14} /> */}
          {/*   </button> */}
          {/*   <span className="text-white font-semibold px-4 py-2 min-w-[50px] text-center"> */}
          {/*     {item.quantity} */}
          {/*   </span> */}
          {/*   <button */}
          {/*     onClick={() => onIncrement(item.id)} */}
          {/*     className="p-2 text-white hover:text-gray-300 transition-colors" */}
          {/*   > */}
          {/*     <Plus size={14} /> */}
          {/*   </button> */}
          {/* </div> */}
          {/**/}
          {/* Price */}
          <div className="text-[#C49E5B] text-lg font-bold min-w-[70px] text-right">
            £{item.price}
          </div>

          {/* Remove button */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
