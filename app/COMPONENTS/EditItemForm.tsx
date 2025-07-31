import { useEffect, useState } from "react";
import api from "~/utils/axios";

type Props = {
  itemId: number;
  onClose: () => void;
  onUpdate: () => void;
};

export default function EditItemForm({ itemId, onClose, onUpdate }: Props) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/inventory/${itemId}`);
        const { name, size, quantity } = res.data;
        setName(name);
        setSize(size);
        setQuantity(quantity);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        alert("Unable to load item.");
      }
    };

    fetchItem();
  }, [itemId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity === "") {
      alert("Quantity is required.");
      return;
    }

    try {
      console.log("Updating item:", { itemId, name, size, quantity });

      await api.put(`/inventory/${itemId}`, {
        name,
        size,
        quantity,
      });

      alert("Item updated!");
      onUpdate(); // Refresh list
      onClose();  // Close modal
    } catch (error: any) {
      console.error("Update failed:", error);
      if (error.response?.data?.errors) {
        console.error("Validation errors:", error.response.data.errors);
      }
      alert("Failed to update item.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white text-black p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold mb-6">Edit Item #{itemId}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name:</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size:</label>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const value = e.target.value;
                setQuantity(value === "" ? "" : Number(value));
              }}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#ba661d] text-white px-4 py-2 rounded hover:bg-[#f08223]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
