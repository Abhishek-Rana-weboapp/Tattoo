import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { piercingJewelryOptions } from "../../data/piercingJewelry";
import { piercingBodyLocations } from "../../data/tattooLocations";
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

    // Set the initial step once when we hydrate from appointment data:
    // jump to the first incomplete piercing (if any), otherwise stay on 1.
    let firstIncomplete = 1;
    for (let i = 1; i <= total; i++) {
      const sel = nextSelections[i] || {};
      if (!sel.jewelry) {
        firstIncomplete = i;
        break;
      }
      const item = piercingJewelryOptions.find((opt) => opt.jewelry === sel.jewelry);
      const gauges = item?.gauges || [];
      const lengths = item?.lengths || [];
      if (gauges.length > 0 && !sel.gauge) {
        firstIncomplete = i;
        break;
      }
      if (lengths.length > 0 && !sel.length) {
        firstIncomplete = i;
        break;
      }
      firstIncomplete = i;
    }
    setActiveIndex((prev) => (prev ? prev : firstIncomplete));
  }, [appointment]);

  const currentSelection = selections[activeIndex] || {};
  const selectedJewelry = currentSelection.jewelry || "";
  const selectedGauge = currentSelection.gauge || "";
  const selectedLength = currentSelection.length || "";

  const selectedLocationLabel = useMemo(() => {
    const raw = appointment?.bodyLocation;
    if (!raw) return "";

    let parsed = raw;
    if (typeof raw === "string") {
      try {
        parsed = JSON.parse(raw);
      } catch {
        return "";
      }
    }

    const entry = parsed?.[activeIndex] || parsed?.[String(activeIndex)];
    if (!entry || typeof entry !== "object") return "";

    const ids = Object.keys(entry)
      .filter((k) => k.startsWith("level"))
      .sort(
        (a, b) =>
          Number(a.replace("level", "")) - Number(b.replace("level", ""))
      )
      .map((k) => entry[k])
      .filter(Boolean);

    if (!ids.length) return "";

    const labels = ids.map((id) => {
      const match = piercingBodyLocations.find((x) => x.id === id);
      return match?.label || id;
    });

    return labels.join(" > ");
  }, [appointment?.bodyLocation, activeIndex]);

  const getBlockedReasonForIndex = useMemo(() => {
    return (i) => {
      const sel = selections[i] || {};
      if (!sel.jewelry) return `Please select a jewelry type for piercing ${i}`;

      const item = piercingJewelryOptions.find((opt) => opt.jewelry === sel.jewelry);
      if (!item) return `Please select a valid jewelry type for piercing ${i}`;

      const gauges = item.gauges || [];
      const lengths = item.lengths || [];

      if (gauges.length > 0 && !sel.gauge) return `Please select a gauge for piercing ${i}`;
      if (lengths.length > 0 && !sel.length) return `Please select a length for piercing ${i}`;

      return null;
    };
  }, [selections]);

  const nextBlockedReasonCurrent = useMemo(() => {
    return getBlockedReasonForIndex(activeIndex);
  }, [activeIndex, getBlockedReasonForIndex]);

  const nextBlockedReasonAll = useMemo(() => {
    for (let i = 1; i <= count; i++) {
      const reason = getBlockedReasonForIndex(i);
      if (reason) return reason;
    }
    return null;
  }, [count, getBlockedReasonForIndex]);

  // NOTE: We intentionally do NOT auto-advance `activeIndex` when the user completes a piercing.
  // Navigation between piercings should be explicit via the Next/Back buttons.

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
    if (activeIndex > 1) {
      setActiveIndex((prev) => Math.max(1, prev - 1));
      return;
    }
    navigate("/billing/2");
  };

  const handleSubmitAll = async () => {
    if (nextBlockedReasonAll) {
      toast.error(nextBlockedReasonAll);
      return;
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

  const handleNextStep = () => {
    if (activeIndex < count) {
      if (nextBlockedReasonCurrent) {
        toast.error(nextBlockedReasonCurrent);
        return;
      }
      setActiveIndex((prev) => Math.min(count, prev + 1));
      return;
    }
    // Last piercing -> submit
    handleSubmitAll();
  };

  if (loading) {
    return <LoaderModal />;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl">
      <div className="flex flex-col gap-1">
        <div className="text-white font-semibold text-lg">
          {selectedLocationLabel || "Selected location"}
        </div>
        <div className="text-white/70 text-sm">{`Piercing ${activeIndex} of ${count}`}</div>
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
              onClick={handleNextStep}
            >
              <TranslationWrapper text={activeIndex < count ? "Next Piercing" : "Next"} />
            </button>
          </div>
    </div>
  );
};

export default PiercingTypeSelection;
