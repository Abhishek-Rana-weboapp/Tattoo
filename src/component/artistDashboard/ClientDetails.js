import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import DatePicker from "../buttons/DatePicker";
import { resolveMediaUrl } from "../../commonFunctions/mediaUrl";
import { GrClose } from "react-icons/gr";
import InputButton from "../buttons/InputButton";
import toast from "react-hot-toast";

function ClientDetailsForm() {
  const { userName } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axiosInstance.get(
          `users/${encodeURIComponent(userName)}`,
        );

        const data = res.data;

        const parsedGuardian = data.guardianInfo
          ? JSON.parse(data.guardianInfo)
          : {
              firstName: "",
              lastName: "",
              dateOfBirth: null,
              email: "",
              phoneNumber: "",
              address: "",
              gender: "",
              race: "",
              state: "",
              city: "",
              zip: "",
            };

        setFormData({
          ...data,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          guardianInfo: {
            ...parsedGuardian,
            dateOfBirth: parsedGuardian.dateOfBirth
              ? new Date(parsedGuardian.dateOfBirth)
              : null,
          },
        });

        setOriginalData({
          ...data,
          dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
          guardianInfo: {
            ...parsedGuardian,
            dateOfBirth: parsedGuardian.dateOfBirth
              ? new Date(parsedGuardian.dateOfBirth)
              : null,
          },
        });
      } catch (err) {
        console.error("Error fetching client:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [userName]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleGuardianDate = (date) => {
    setFormData((prev) => ({
      ...prev,
      guardianInfo: {
        ...prev.guardianInfo,
        dateOfBirth: date,
      },
    }));
  };

  const handleGuardianChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      guardianInfo: {
        ...prev.guardianInfo,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...formData,
        dateOfBirth: formData.dateOfBirth
          ? formData.dateOfBirth.toISOString()
          : null,
        guardianInfo: formData.minor ? formData.guardianInfo : null,
      };

      await axiosInstance.put(`/admin/users/${formData.id}`, payload);

      toast.success("Client updated successfully");
      navigate(-1);
    } catch (error) {
      toast.error("Failed to update client");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleIdDelete = () => {
    setFormData((prev) => ({
      ...prev,
      clientId: null,
    }));
  };

  const handleGuardianIdDelete = () => {
    setFormData((prev) => ({
      ...prev,
      guardianId: null,
    }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please provide a file");
      return;
    }
    const name = e.target.name;
    const formData = new FormData();
    formData.append("profiles", file);
    try {
      setUploading(true);
      const res = await axiosInstance.post("/upload", formData);
      if (res.status === 200) {
        setFormData((prev) => ({
          ...prev,
          [name]: res.data.profile_urls[0],
        }));
      }
    } catch (error) {
      toast.error("Failed to upload ID");
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!formData) return <div className="p-6 text-white">Client not found</div>;

  return (
    <div className="max-w-4xl w-full mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Edit Client Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
          <Input
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
          />
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              Date of Birth
            </label>
            <div className="flex gap-3 bg-white p-2 py-[5px] rounded-lg items-center">
              <DatePicker
                date={formData.dateOfBirth}
                setDate={(date) =>
                  setFormData((prev) => ({
                    ...prev,
                    dateOfBirth: date,
                  }))
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-white mb-1">Language</label>
            <select
              onChange={handleChange}
              name="lang"
              className="w-full p-2 bg-white border border-gray-600 text-black rounded-lg"
              value={formData.lang}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          <Input
            label="Gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          />
          <Input
            label="Race"
            name="race"
            value={formData.race || ""}
            onChange={handleChange}
          />
        </div>

        {/* Address */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
          />
          <Input
            label="City"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
          />
          <Input
            label="State"
            name="state"
            value={formData.state || ""}
            onChange={handleChange}
          />
          <Input
            label="Zip Code"
            name="zip"
            value={formData.zip || ""}
            onChange={handleChange}
          />
        </div>

        {/* Guardian */}
        {formData.minor ? (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">Guardian Info</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Guardian First Name"
                name="firstName"
                value={formData.guardianInfo?.firstName || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Last Name"
                name="lastName"
                value={formData.guardianInfo?.lastName || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Email"
                name="email"
                value={formData.guardianInfo?.email || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Phone"
                name="phoneNumber"
                value={formData.guardianInfo?.phoneNumber || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Address"
                name="address"
                value={formData.guardianInfo?.address || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian City"
                name="city"
                value={formData.guardianInfo?.city || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian State"
                name="state"
                value={formData.guardianInfo?.state || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Zip"
                name="zip"
                value={formData.guardianInfo?.zip || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Gender"
                name="gender"
                value={formData.guardianInfo?.gender || ""}
                onChange={handleGuardianChange}
              />

              <Input
                label="Guardian Race"
                name="race"
                value={formData.guardianInfo?.race || ""}
                onChange={handleGuardianChange}
              />

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Guardian Date of Birth
                </label>
                <div className="flex gap-3 bg-white p-2 rounded-lg items-center">
                  <DatePicker
                    date={formData.guardianInfo?.dateOfBirth}
                    setDate={handleGuardianDate}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Uploaded ID */}
        <div className="flex md:flex-row flex-col gap-5 md:justify-between">
          <div>
            <h2 className="text-xl font-semibold mt-6 mb-2">
              Uploaded Client ID
            </h2>
            {formData.clientId ? (
              <div className="relative w-max">
                <img
                  src={resolveMediaUrl(`${apiUrl}api/`, formData.clientId)}
                  alt="Client ID"
                  className="md:size-40 size-20 border object-cover border-gray-600 rounded"
                />
                <button
                type="button"
                  className="absolute top-1 right-1 rounded-full bg-gray-500 p-1"
                  onClick={() => {
                    handleIdDelete();
                  }}
                >
                  <GrClose />
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-400 mb-2">No ID uploaded</p>
                <InputButton
                  name="clientId"
                  onChange={handleUpload}
                  text={"Upload ID"}
                />
              </>
            )}
          </div>
          {formData.minor ? (
            <div>
              <h2 className="text-xl font-semibold mt-6 mb-2">
                Uploaded Guardian ID
              </h2>
              {formData.guardianId ? (
                <div className="relative w-max">
                  <img
                    src={resolveMediaUrl(`${apiUrl}api/`, formData.guardianId)}
                    alt="Guardian ID"
                    className="md:size-40 size-20 border object-cover border-gray-600 rounded"
                  />
                  <button
                  type="button"
                    className="absolute top-1 right-1 rounded-full bg-gray-500 p-1"
                    onClick={() => {
                      handleGuardianIdDelete();
                    }}
                  >
                    <GrClose />
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-400 mb-2">No ID uploaded</p>
                  <InputButton
                    name="guardianId"
                    onChange={handleUpload}
                    text={"Upload Guardian ID"}
                  />
                </>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            className="yellowButton text-black font-semibold px-6 py-2 rounded-xl mx-auto hover:bg-blue-700"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={saving}
            className="yellowButton text-black font-semibold px-6 py-2 rounded-xl mx-auto hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm text-white mb-1">{label}</label>
    <input
      {...props}
      className="w-full p-2 bg-white border border-gray-600 text-black rounded-lg"
    />
  </div>
);

export default ClientDetailsForm;
