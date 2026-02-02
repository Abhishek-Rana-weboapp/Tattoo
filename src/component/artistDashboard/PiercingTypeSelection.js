import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { piercingJewelryOptions } from "../../data/piercingJewelry";
import TranslationWrapper from "../Layout/TranslationWrapper";
import LoaderModal from "../modal/LoaderModal";
import axiosInstance from "../../config/axios";
import { useAppointmentContext } from "../../context/AppointmentContext";

const PiercingTypeSelection = () => {
  const navigate = useNavigate();
  const { appointment, setAppointment } = useAppointmentContext();
  const [selectedJewelry, setSelectedJewelry] = useState("");
  const [selectedGauge, setSelectedGauge] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [loading, setLoading] = useState(false);

  const availableGauges = useMemo(() => {
    if (!selectedJewelry) return [];
    const item = piercingJewelryOptions.find(
      (opt) => opt.jewelry === selectedJewelry
    );
    return item ? item.gauges : [];
  }, [selectedJewelry]);

  const availableLengths = useMemo(() => {
    if (!selectedJewelry || !selectedGauge) return [];
    const item = piercingJewelryOptions.find(
      (opt) => opt.jewelry === selectedJewelry
    );
    if (!item) return [];
    const gaugeEntry = item.gauges.find((g) => g.gauge === selectedGauge);
    return gaugeEntry ? gaugeEntry.lengths : [];
  }, [selectedJewelry, selectedGauge]);

  const handleJewelryChange = (e) => {
    const value = e.target.value;
    setSelectedJewelry(value);
    setSelectedGauge("");
    setSelectedLength("");
  };

  const handleGaugeChange = (e) => {
    const value = e.target.value;
    setSelectedGauge(value);
    setSelectedLength("");
  };

  const handleLengthChange = (e) => {
    setSelectedLength(e.target.value);
  };

  const hasLengthOptions = availableLengths.length > 0;

  const handlePrev = () => {
    navigate("/billing/2");
  };

  const handleNext = async() => {
    if (!selectedJewelry) {
      toast.error("Please select a jewelry type");
      return;
    }
    if (availableGauges.length > 0 && !selectedGauge) {
      toast.error("Please select a gauge");
      return;
    }
    if (hasLengthOptions && !selectedLength) {
      toast.error("Please select a length");
      return;
    }
    const updates = {
      piercingJewelry: selectedJewelry,
      piercingGauge: selectedGauge,
      piercingLength: selectedLength,
      adminProcessStep: 5,
    };
    try {
      setLoading(true);
      const response = await axiosInstance.put(`/appointment/${appointment.id}`, updates);
      if (response.status === 200) {
        navigate(`/billing/${response.data.appointment.adminProcessStep}`);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold">Jewelry</label>
        <select
          className="w-full p-2 rounded-lg bg-white text-black"
          value={selectedJewelry}
          onChange={handleJewelryChange}
        >
          <option value="">Select jewelry type</option>
          {piercingJewelryOptions.map((opt) => (
            <option key={opt.jewelry} value={opt.jewelry}>
              {opt.jewelry}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold">Gauge</label>
        <select
          className="w-full p-2 rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
          value={selectedGauge}
          onChange={handleGaugeChange}
          disabled={!selectedJewelry}
        >
          <option value="">Select gauge</option>
          {availableGauges.map((g) => (
            <option key={g.gauge} value={g.gauge}>
              {g.gauge}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold">Length</label>
        <select
          className="w-full p-2 rounded-lg bg-white text-black disabled:opacity-50 disabled:cursor-not-allowed"
          value={selectedLength}
          onChange={handleLengthChange}
          disabled={!selectedGauge || !hasLengthOptions}
        >
          <option value="">
            {hasLengthOptions ? "Select length" : "N/A"}
          </option>
          {availableLengths.map((len) => (
            <option key={len} value={len}>
              {len}
            </option>
          ))}
        </select>
      </div>


      <div className="flex gap-5 items-center">
            <button
              className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
              onClick={handlePrev}
            >
              <TranslationWrapper text={"Back"} />
            </button>
            <button
              className="yellowButton rounded-xl py-2 px-4 font-bold text-black"
              onClick={handleNext}
            >
              <TranslationWrapper text={"Next"} />
            </button>
          </div>
    </div>
  );
};

export default PiercingTypeSelection;
