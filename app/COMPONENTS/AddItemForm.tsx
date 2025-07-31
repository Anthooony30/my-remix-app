  // components/AddItemForm.tsx
  import React from "react";

  interface AddItemFormProps {
    name: string;
    size: string;
    quantity: number | "";
    error: string;
    onNameChange: (val: string) => void;
    onSizeChange: (val: string) => void;
    onQuantityChange: (val: number | "") => void;
    onSubmit: (e: React.FormEvent) => void;
  }

  export default function AddItemForm({
    name,
    size,
    quantity,
    error,
    onNameChange,
    onSizeChange,
    onQuantityChange,
    onSubmit,
  }: AddItemFormProps) {
    return (
      <div className="mb-8 bg-white border border-gray-400 rounded-md p-6 shadow">
        <h2 className="text-xl font-semibold text-amber-800 mb-4">Add New Item</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="px-4 py-2 text-black border rounded"
            required
          />
          <input
            type="text"
            placeholder="Size"
            value={size}
            onChange={(e) => onSizeChange(e.target.value)}
            className="px-4 py-2 text-black border rounded"
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) =>
              onQuantityChange(e.target.value === "" ? "" : parseInt(e.target.value))
            }
            className="px-4 py-2 text-black border rounded"
            required
          />
          <div className="col-span-1 md:col-span-3 text-right">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    );
  }
