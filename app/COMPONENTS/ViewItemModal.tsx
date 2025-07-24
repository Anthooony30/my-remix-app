import { useEffect, useState } from "react";
import api from "~/utils/axios";

type Props = {
  itemId: number;
  onClose: () => void;
};

export default function ViewItemModal({ itemId, onClose }: Props) {
  const [item, setItem] = useState<{
    id: number;
    name: string;
    size: string;
    quantity: number;
  } | null>(null);

  useEffect(() => {
    api
      .get(`/inventory/${itemId}`)
      .then((res) => setItem(res.data))
      .catch((err) => {
        console.error("Failed to fetch item:", err);
        onClose();
      });
  }, [itemId, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Item Details</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {item.id}</p>
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Size:</strong> {item.size}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#e88936] text-white rounded hover:bg-[#ffa04d]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

