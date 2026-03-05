import { useState } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import ToggleButton from "../buttons/ToggleButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EmployeeForm = ({
  mode,
  setMode,
  selectedEmployee,
  setEmployees,
  setIsOpen,
}) => {
  const [firstName, setFirstName] = useState(
    mode === "edit" ? selectedEmployee?.firstName || "" : ""
  );
  const [lastName, setLastName] = useState(
    mode === "edit" ? selectedEmployee?.lastName || "" : ""
  );
  const [userName, setUserName] = useState(
    mode === "edit" ? selectedEmployee?.userName || "" : ""
  );
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(
    mode === "edit" ? selectedEmployee?.userType || "artist" : "artist"
  );
  const [active, setActive] = useState(
    mode === "edit" ? selectedEmployee?.active : true
  );

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) return setError("First Name is required");
    if (!userName.trim()) return setError("Username is required");

    if (mode === "add" && !password.trim())
      return setError("Password is required");

    const data = {
      firstName,
      lastName,
      userName,
      active,
      role,
    };

    // Only send password if provided
    if (password.trim()) {
      data.password = password;
    }

    try {
      setLoading(true);

      if (mode === "add") {
        const res = await axiosInstance.post("employee", data);

        if (res.status === 201) {
          toast.success("Employee added successfully");
          setEmployees((prev) => [...prev, res.data.employee]);
          setIsOpen(false);
        }
      }

      if (mode === "edit") {
        const res = await axiosInstance.put(
          `employee/${selectedEmployee.id}`,
          data
        );

        if (res.status === 200) {
          toast.success("Employee updated successfully");

          setEmployees((prev) =>
            prev.map((emp) =>
              emp.id === selectedEmployee.id
                ? {
                    ...emp,
                    firstName,
                    lastName,
                    userName,
                    active,
                    userType: role,
                  }
                : emp
            )
          );

          setIsOpen(false);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <h1 className="md:text-2xl text-lg uppercase font-bold mb-4 text-center">
        {mode} Employee
      </h1>

      {/* First Name */}
      <label className="text-white flex flex-col mt-3">
        <span>
          First Name <span className="text-red-500 text-xs">*</span>
        </span>
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      {/* Last Name */}
      <label className="text-white flex flex-col mt-3">
        Last Name
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      {/* Username */}
      <label className="text-white flex flex-col mt-3">
        <span>
          Username <span className="text-red-500 text-xs">*</span>
        </span>
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>

      {/* Password */}
      <label className="text-white flex flex-col mt-3">
        <span>
          Password{" "}
          {mode === "add" && (
            <span className="text-red-500 text-xs">*</span>
          )}
        </span>

        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            className="p-2 rounded-md text-black w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={mode === "edit" ? "Leave blank to keep unchanged" : ""}
          />

          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2 text-black"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </label>

      {/* Role Selector */}
      <label className="text-white flex flex-col mt-3">
        Role
        <select
          className="p-2 rounded-md text-black"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="artist">Artist</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      {/* Active Toggle */}
      <div className="mt-6">
        <ToggleButton
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        >
          <span className="text-white ml-2">Active</span>
        </ToggleButton>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Buttons */}
      <div className="flex justify-center mt-6 gap-3">
        <button
          type="button"
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
          onClick={() => {
            setIsOpen(false);
            setMode("add");
          }}
        >
          Back
        </button>

        <button
          type="submit"
          disabled={loading}
          className="yellowButton py-2 px-4 rounded-3xl font-bold text-black"
        >
          {loading
            ? "Processing..."
            : mode === "add"
            ? "Add Employee"
            : "Update Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;

// import { useState } from "react";
// import axiosInstance from "../../config/axios";
// import toast from "react-hot-toast";
// import ToggleButton from "../buttons/ToggleButton";
// import { FaEye,FaEyeSlash } from "react-icons/fa";

// const EmployeeForm = ({
//   mode,
//   setMode,
//   selectedEmployee,
//   setSelectedEmployee,
//   setEmployees,
//   setIsOpen,
// }) => {
//   const [firstName, setFirstName] = useState(
//     mode === "edit" ? selectedEmployee?.firstName || "" : "",
//   );
//   const [lastName, setLastName] = useState(
//     mode === "edit" ? selectedEmployee?.lastName || "" : "",
//   );
//   const [userName, setUserName] = useState(selectedEmployee?.userName || "");
//   const [password, setPassword] = useState("");
//   const [active, setActive] = useState(
//     mode === "edit" ? selectedEmployee?.active : true,
//   );
//   const [isVisible, setIsVisible] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!firstName.trim()) {
//       setError("First Name is required");
//       return;
//     }

//     let data = {
//       firstName,
//       lastName,
//       userName,
//       password,
//       active,
//     };

//     try {
//       if (mode === "add") {
//         const res = await axiosInstance.post("employee", data);
//         if (res.status === 201) {
//           toast.success("Employee added successfully");
//           setEmployees((prev) => [...prev, res.data.employee]);
//           setFirstName("");
//           setLastName("");
//           setIsOpen(false);
//           setError(null);
//         }
//       }

//       if (mode === "edit") {
//         const res = await axiosInstance.put(
//           `employee/${selectedEmployee.id}`,
//           data,
//         );
//         if (res.status === 200) {
//           toast.success("Employee updated successfully");
//           setEmployees((prev) =>
//             prev.map((emp) =>
//               emp.id === selectedEmployee.id
//                 ? { ...emp, firstName, lastName, active }
//                 : emp,
//             ),
//           );
//           setFirstName("");
//           setLastName("");
//           setIsOpen(false);
//           setError(null);
//         }
//       }
//     } catch (error) {
//       console.log("Error adding employee:", error);
//       toast.error("Failed to add employee");
//     }
//   };

//   return (
//     <form className="p-3" onSubmit={handleSubmit}>
//       <h1 className=" md:text-2xl text-lg uppercase font-bold mb-4 text-center ">
//         {mode} Employee
//       </h1>

//       <label htmlFor="firstName" className="text-white flex flex-col mt-3">
//         <span>
//           First Name <span className="text-red-500 text-xs">*</span>
//         </span>
//         <input
//           type="text"
//           id="firstName"
//           className="p-2 rounded-md text-black"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </label>
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//       <label htmlFor="lastName" className="text-white flex flex-col mt-3">
//         Last Name
//         <input
//           type="text"
//           id="lastName"
//           className="p-2 rounded-md text-black"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </label>
//       <label htmlFor="userName" className="text-white flex flex-col mt-3">
//         <span>UserName <span className="text-red-500 text-xs">*</span></span>
//         <input
//           type="text"
//           id="userName"
//           className="p-2 rounded-md text-black"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//       </label>
//       <label htmlFor="password" className="text-white flex flex-col mt-3">
//         <span>Password <span className="text-red-500 text-xs">*</span></span>
//         <div className="relative">
//           <input
//             type={isVisible ? "text" : "password"}
//             id="password"
//             className="p-2 rounded-md text-black w-full"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {
//             isVisible ? <button type="button" className="absolute top-1/2 right-2 -translate-y-1/2 z-10 " onClick={()=>setIsVisible(false)}> <FaEye  color="black" /></button> : <button type="button" className="absolute top-1/2 right-2 -translate-y-1/2 z-10 " onClick={()=>setIsVisible(true)}>
//               <FaEyeSlash  color="black" />
//             </button>
//           }
//         </div>
//       </label>

//       <div className="mt-6">
//         <ToggleButton
//           checked={active}
//           onChange={(e) => setActive(e.target.checked)}
//         >
//           <span className="text-white ml-2">Active</span>
//         </ToggleButton>
//       </div>

//       <div className="flex justify-center  mt-6">
//         <button
//           type="button"
//           className="yellowButton py-2 px-4  rounded-3xl font-bold  mb-2 mr-2 text-black"
//           onClick={() => {
//             setIsOpen(false);
//             setMode("add");
//           }}
//         >
//           Back
//         </button>

//         <button
//           type="submit"
//           className="yellowButton py-2 px-4  rounded-3xl font-bold  mb-2 mr-2 text-black"
//         >
//           {mode === "add" ? "Add Employee" : "Update Employee"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default EmployeeForm;
