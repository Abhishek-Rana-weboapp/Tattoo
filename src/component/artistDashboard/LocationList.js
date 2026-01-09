import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../modal/ConfirmationModal";
import ShopLocationForm from "../forms/ShopLocationForm";

const LocationList = () => {
  const navigate = useNavigate();

  const [shopLocations, setShopLocations] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get("shoplocation");
        if (res.status === 200) {
          setShopLocations(res.data.shoplocations);
        }
      } catch (error) {
        toast.error("Failed to fetch shop locations");
      }
    };

    fetchLocations();
  }, []);


  const handleDeleteLocation = async (id) => {
    if (!id) return;

    try {
      const res = await axiosInstance.delete(`shoplocation/${id}`);
      if (res.status === 200) {
        toast.success("Shop location deleted successfully");
        setShopLocations((prev) => prev.filter((loc) => loc.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete shop location");
    } finally {
      setIsConfirmOpen(false);
      setLocationToDelete(null);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleDeleteLocation(locationToDelete)}
        title="Delete Shop Location"
        itemName="this shop location"
        CTA="Delete Location"
      />

      <div className="text-white max-w-3xl w-full">
        <div className="mb-5 relative">
          <h1 className="md:text-3xl text-xl uppercase font-bold text-center">
            Shop Locations
          </h1>

          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400"
            onClick={() => {
              setFormMode("add");
              setIsFormOpen(true);
              setSelectedLocation(null);
            }}
          >
            <FaPlus className="size-5" />
          </button>
        </div>

        {isFormOpen ? (
          <ShopLocationForm
            mode={formMode}
            selectedLocation={selectedLocation}
            setShopLocations={setShopLocations}
            setIsOpen={setIsFormOpen}
            setMode={setFormMode}
          />
        ) : (
          <table className="max-w-3xl w-full border border-gray-700 rounded-lg">
            <thead className="flex">
              <th className="w-2/4 p-2 text-start">Location</th>
              <th className="w-1/4 p-2">Status</th>
              <th className="w-1/4 p-2">Options</th>
            </thead>

            <tbody>
              {shopLocations.map((loc) => (
                <tr
                  key={loc.id}
                  className="flex justify-between items-center border-t border-gray-700 p-2"
                >
                  <td className="w-2/4 capitalize">{loc.shoplocation}</td>

                  <td className="w-1/4 text-center">
                    {loc.active ? "Active" : "Inactive"}
                  </td>

                  <td className="w-1/4 flex justify-center">
                    <button
                      className="px-2 py-2 hover:bg-yellow-600 rounded-md"
                      onClick={() => {
                        setFormMode("edit");
                        setSelectedLocation(loc);
                        setIsFormOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="px-2 py-2 hover:bg-red-600 rounded-md"
                      onClick={() => {
                        setLocationToDelete(loc.id);
                        setIsConfirmOpen(true);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black absolute bottom-5 left-1/2 -translate-x-1/2"
          onClick={() => navigate(-1)}
        >
          Prev
        </button>
      </div>
    </>
  );
};

export default LocationList;
