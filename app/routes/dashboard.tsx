import { useNavigate } from "@remix-run/react";
import Footers from "~/COMPONENTS/footers";
import NavigationBar from "~/COMPONENTS/navigationBar";
import AddItemForm from "~/COMPONENTS/AddItemForm";
import EditItemForm from "~/COMPONENTS/EditItemForm";
import ViewItemModal from "~/COMPONENTS/ViewItemModal";
import api from "~/utils/axios";
import { useEffect, useState } from "react";


type CoffeeItem = {
  id: number;
  name: string;
  quantity: number;
  size: string;
};



export default function Dashboard() {
  const [items, setItems] = useState<CoffeeItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewingItemId, setViewingItemId] = useState<number | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null);
  const [deleteItemName, setDeleteItemName] = useState<string>("");
  const [sizeFilter, setSizeFilter] = useState<string>("All");




  const fetchItems = () => {
    api.get("/inventory")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Failed to fetch inventory items:", err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

      const confirmDelete = async () => {
      if (deleteItemId === null) return;

      try {
        await api.delete(`/inventory/${deleteItemId}`);
        fetchItems();
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setDeleteItemId(null); // Close modal
      }
    };


  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !size || quantity === "") {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/inventory", { name, size, quantity: Number(quantity) });
      setName("");
      setSize("");
      setQuantity("");
      setShowForm(false);
      fetchItems();
    } catch (err) {
      console.error("Failed to add item:", err);
      setError("Failed to add item. Please try again.");
    }
  };

  

  return (
    <>
      <NavigationBar />

      <main className="p-6 bg-white dark:bg-gray-100 min-h-screen">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-
          
          text-amber-900">Coffee Inventory Dashboard</h1>
          
          <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded text-black px-4 py-2 ml-auto max-w-sm sm:2xl md:w-96 lg:6xl transition"
              />
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="border border-gray-300 text-black rounded px-4 py-2"
            >
              <option value="All">All Sizes</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-amber-700 text-white px-4 py-2 rounded hover:bg-amber-800 transition"
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
          
        </div>

        {showForm && (
          <AddItemForm
            name={name}
            size={size}
            quantity={quantity}
            error={error}
            onNameChange={setName}
            onSizeChange={setSize}
            onQuantityChange={setQuantity}
            onSubmit={handleAddItem}
          />
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-500 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-amber-700 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Item ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Size</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items
                  .filter((item) => {
                      const search = searchTerm.toLowerCase();
                      const matchesSearch = item.name.toLowerCase().startsWith(search);

                      const matchesSize =
                        sizeFilter === "All" || item.size.toLowerCase() === sizeFilter.toLowerCase();

                      return matchesSearch && matchesSize;
                    })
                .map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-100 text-black">
                    <td className="py-3 px-6">{item.id}</td>
                    <td className="py-3 px-6">{item.name}</td>
                    <td className="py-3 px-6">{item.size}</td>
                    <td className="py-3 px-6">{item.quantity}</td>
                    <td className="py-3 px-6 space-x-2">
                      <button
                        onClick={() => {
                          console.log("Viewing item", item.id);
                          setViewingItemId(item.id);
                        }}
                        className="bg-[#e88936] text-white px-3 py-1 rounded hover:bg-[#ffa04d]"
                      >
                        View
                      </button>
                    <button
                        onClick={() => setEditingItemId(item.id)}
                        className="bg-[#ba661d] text-white px-3 py-1 rounded hover:bg-[#f08223]"
                      >
                        Edit 	
                      </button>
                    <button
                      onClick={() => {
                        setDeleteItemId(item.id);
                        setDeleteItemName(item.name);
                      }}
                      className="bg-[#ac1414] text-white px-3 py-1 rounded hover:bg-[#e81b1b]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
          {editingItemId !== null && (
          <EditItemForm
            itemId={editingItemId}
            onClose={() => setEditingItemId(null)}
            onUpdate={fetchItems}
          />
          )}
          {viewingItemId !== null && (
          <ViewItemModal
            itemId={viewingItemId}
            onClose={() => setViewingItemId(null)}
          />
          )}

          {deleteItemId !== null && (
            <div className="fixed inset-0 bg-gray bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-red-700 mb-4">Confirm Delete</h2>
                <p className="mb-6 text-gray-800">
                  Are you sure you want to delete <span className="font-semibold">{deleteItemName}</span>?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setDeleteItemId(null)}
                    className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-[#ac1414] text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

      </main>

      <Footers />
    </>
  );
}
