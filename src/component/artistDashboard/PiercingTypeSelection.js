import React, { useState, useMemo, useEffect } from "react";
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
  const count = appointment?.count || 1;

  // selections: { [index: number]: { jewelry, gauge, length } }
  const [selections, setSelections] = useState({});
  const [activeIndex, setActiveIndex] = useState(1);
  const [loading, setLoading] = useState(false);

  // Hydrate from existing appointment (supports both legacy single values and new JSON array)
  useEffect(() => {
    if (!appointment) return;

    const nextSelections = {};
    const total = appointment.count || 1;

    const raw = appointment.piercingJewelry;
    let parsed = null;
    if (typeof raw === "string" && raw.trim()) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }
    }

    if (Array.isArray(parsed)) {
      // New separated format (preferred):
      // - piercingJewelry: JSON.stringify(["Curve", "Labret", ...])
      // - piercingGauge: JSON.stringify(["14G", "16G", ...])
      // - piercingLength: JSON.stringify(["3/8", "5/8", ...])
      if (parsed.length === 0 || typeof parsed[0] === "string") {
        let parsedGauges = null;
        let parsedLengths = null;

        if (
          typeof appointment.piercingGauge === "string" &&
          appointment.piercingGauge.trim()
        ) {
          try {
            parsedGauges = JSON.parse(appointment.piercingGauge);
          } catch {
            parsedGauges = null;
          }
        }

        if (
          typeof appointment.piercingLength === "string" &&
          appointment.piercingLength.trim()
        ) {
          try {
            parsedLengths = JSON.parse(appointment.piercingLength);
          } catch {
            parsedLengths = null;
          }
        }

        for (let i = 1; i <= total; i++) {
          const idx = i - 1;
          nextSelections[i] = {
            jewelry: parsed[idx] || "",
            gauge: Array.isArray(parsedGauges) ? parsedGauges[idx] || "" : "",
            length: Array.isArray(parsedLengths) ? parsedLengths[idx] || "" : "",
          };
        }
      } else {
        // Legacy combined format: JSON.stringify([{ jewelry, gauge, length }, ...])
        parsed.forEach((item, idx) => {
          const index = idx + 1;
          if (index > total) return;
          nextSelections[index] = {
            jewelry: item.jewelry || "",
            gauge: item.gauge || item.piercingGauge || "",
            length: item.length || item.piercingLength || "",
          };
        });
      }
    } else if (
      appointment.piercingJewelry ||
      appointment.piercingGauge ||
      appointment.piercingLength
    ) {
      // Legacy single selection
      nextSelections[1] = {
        jewelry: appointment.piercingJewelry || "",
        gauge: appointment.piercingGauge || "",
        length: appointment.piercingLength || "",
      };
    }

    setSelections(nextSelections);
  }, [appointment]);

  const currentSelection = selections[activeIndex] || {};
  const selectedJewelry = currentSelection.jewelry || "";
  const selectedGauge = currentSelection.gauge || "";
  const selectedLength = currentSelection.length || "";

  const isNextEnabled = useMemo(() => {
    // Must be complete for every piercing index (1..count)
    for (let i = 1; i <= count; i++) {
      const sel = selections[i] || {};
      if (!sel.jewelry) return false;

      const item = piercingJewelryOptions.find((opt) => opt.jewelry === sel.jewelry);
      if (!item) return false;

      const gauges = item.gauges || [];
      const lengths = item.lengths || [];

      // If the option exists, it must be selected
      if (gauges.length > 0 && !sel.gauge) return false;
      if (lengths.length > 0 && !sel.length) return false;
    }
    return true;
  }, [count, selections]);

  const availableGauges = useMemo(() => {
    if (!selectedJewelry) return [];
    const item = piercingJewelryOptions.find(
      (opt) => opt.jewelry === selectedJewelry
    );
    return item ? item.gauges || [] : [];
  }, [selectedJewelry]);

  const availableLengths = useMemo(() => {
    if (!selectedJewelry) return [];
    const item = piercingJewelryOptions.find(
      (opt) => opt.jewelry === selectedJewelry
    );
    return item ? item.lengths || [] : [];
  }, [selectedJewelry]);

  const handleJewelryChange = (e) => {
    const value = e.target.value;
    setSelections((prev) => ({
      ...prev,
      [activeIndex]: {
        jewelry: value,
        gauge: "",
        length: "",
      },
    }));
  };

  const handleGaugeChange = (e) => {
    const value = e.target.value;
    setSelections((prev) => ({
      ...prev,
      [activeIndex]: {
        ...(prev[activeIndex] || {}),
        jewelry: selectedJewelry,
        gauge: value,
        length: "",
      },
    }));
  };

  const handleLengthChange = (e) => {
    const value = e.target.value;
    setSelections((prev) => ({
      ...prev,
      [activeIndex]: {
        ...(prev[activeIndex] || {}),
        jewelry: selectedJewelry,
        gauge: selectedGauge,
        length: value,
      },
    }));
  };

  const hasLengthOptions = availableLengths.length > 0;

  const handlePrev = () => {
    navigate("/billing/2");
  };

  const handleNext = async () => {
    if(!isNextEnabled){
      toast.error("Please select the available options (jewelry, gauge, length) for all piercings before continuing.");
      return;
    }
    // Validate selections for all piercings
    for (let i = 1; i <= count; i++) {
      const sel = selections[i] || {};
      if (!sel.jewelry) {
        toast.error(`Please select a jewelry type for piercing ${i}`);
        return;
      }
      const item = piercingJewelryOptions.find(
        (opt) => opt.jewelry === sel.jewelry
      );
      const gauges = item?.gauges || [];
      const lengths = item?.lengths || [];

      if (gauges.length > 0 && !sel.gauge) {
        toast.error(`Please select a gauge for piercing ${i}`);
        return;
      }
      if (lengths.length > 0 && !sel.length) {
        toast.error(`Please select a length for piercing ${i}`);
        return;
      }
    }

    const jewelryArray = [];
    const gaugeArray = [];
    const lengthArray = [];
    for (let i = 1; i <= count; i++) {
      const sel = selections[i] || {};
      jewelryArray.push(sel.jewelry || "");
      gaugeArray.push(sel.gauge || "");
      lengthArray.push(sel.length || "");
    }

    const updates = {
      piercingJewelry: JSON.stringify(jewelryArray),
      piercingGauge: JSON.stringify(gaugeArray),
      piercingLength: JSON.stringify(lengthArray),
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
        <label className="text-white font-semibold">Piercing number</label>
        <select
          className="w-full p-2 rounded-lg bg-white text-black"
          value={activeIndex}
          onChange={(e) => setActiveIndex(Number(e.target.value) || 1)}
        >
          {Array.from({ length: count }, (_, idx) => idx + 1).map((idx) => (
            <option key={idx} value={idx}>
              {`Piercing ${idx} of ${count}`}
            </option>
          ))}
        </select>
      </div>

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
          {availableGauges.map((gauge) => (
            <option key={gauge} value={gauge}>
              {gauge}
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
          disabled={!selectedJewelry || !hasLengthOptions}
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
