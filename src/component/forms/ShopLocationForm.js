import { useState } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import ToggleButton from "../buttons/ToggleButton";
import { useEffect } from "react";

const ShopLocationForm = ({
  mode,
  selectedLocation,
  setShopLocations,
  setIsOpen,
  setMode,
}) => {
  const [shoplocation, setShopLocation] = useState(
    mode === "edit" ? selectedLocation?.shoplocation || "" : ""
  );

  const [active, setActive] = useState(
    mode === "edit" ? selectedLocation?.active : true
  );

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shoplocation.trim()) {
      setError("Shop location is required");
      return;
    }

    const data = { shoplocation, active };

    try {
      if (mode === "add") {
        const res = await axiosInstance.post("shoplocation", data);
        if (res.status === 201) {
          toast.success("Shop location added successfully");
          setShopLocations((prev) => [...prev, res.data.shoplocation]);
        }
      }

      if (mode === "edit") {
        const res = await axiosInstance.put(
          `shoplocation/${selectedLocation.id}`,
          data
        );

        if (res.status === 200) {
          toast.success("Shop location updated successfully");
          setShopLocations((prev) =>
            prev.map((loc) =>
              loc.id === selectedLocation.id
                ? { ...loc, shoplocation, active }
                : loc
            )
          );
        }
      }

      setShopLocation("");
      setIsOpen(false);
      setMode("add");
      setError(null);
    } catch (error) {
      toast.error("Failed to save shop location");
    }
  };

  useEffect(()=>{
    if(mode === "add"){
        setShopLocation("")
        setActive(true)
    }
  },[mode])

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <h1 className="md:text-2xl text-lg uppercase font-bold mb-4 text-center">
        {mode} Shop Location
      </h1>

      <label className="text-white flex flex-col mt-3">
        <span>
          Shop Location <span className="text-red-500">*</span>
        </span>
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={shoplocation}
          onChange={(e) => setShopLocation(e.target.value)}
        />
      </label>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <div className="mt-6">
        <ToggleButton
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        >
          <span className="text-white ml-2">Active</span>
        </ToggleButton>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black mr-2"
          onClick={() => {
            setIsOpen(false);
            setMode("add");
          }}
        >
          Back
        </button>

        <button
          type="submit"
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
        >
          {mode === "add" ? "Add Location" : "Update Location"}
        </button>
      </div>
    </form>
  );
};

export default ShopLocationForm;
