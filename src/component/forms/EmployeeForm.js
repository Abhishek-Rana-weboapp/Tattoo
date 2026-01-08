import { useState } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import { set } from "lodash";
import ToggleButton from "../buttons/ToggleButton";

const EmployeeForm = ({ mode, setMode, selectedEmployee,setSelectedEmployee, setEmployees ,setIsOpen }) => {

  const [firstName, setFirstName] = useState(mode === "edit" ? selectedEmployee?.firstName || "": "");
  const [lastName, setLastName] = useState(mode === "edit" ? selectedEmployee?.lastName || "": "");
  const [active, setActive] = useState(mode === "edit" ? selectedEmployee?.active : true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async(e)=>{
     e.preventDefault();

     if(!firstName.trim()){
        setError("First Name is required")
        return
     }

        let data = {
            firstName,
            lastName,
            active
        }

        console.log(data)

     try {
        if(mode === "add"){
            const res = await axiosInstance.post("employee", data)
            if(res.status === 201){
                toast.success("Employee added successfully")
                setEmployees((prev)=>[...prev, res.data.employee])
                setFirstName("")
                setLastName("")
                setIsOpen(false)
                setError(null)
            }
        }

        if(mode === "edit"){
            const res = await axiosInstance.put(`employee/${selectedEmployee.id}`, data)
            if(res.status === 200){
                toast.success("Employee updated successfully")
                setEmployees((prev)=> prev.map((emp)=> emp.id === selectedEmployee.id ? { ...emp, firstName, lastName, active } : emp))
                setFirstName("")
                setLastName("")
                setIsOpen(false)
                setError(null)
            }
        }
     } catch (error) {
        console.log("Error adding employee:", error);
        toast.error("Failed to add employee")
     }
  }

  return (
    <form className="p-3" onSubmit={handleSubmit}>
      <h1 className=" md:text-2xl text-lg uppercase font-bold mb-4 text-center ">
        {mode} Employee
      </h1>

      <label htmlFor="firstName" className="text-white flex flex-col mt-3">
        <span>First Name <span className="text-red-500 text-xs">*</span></span>
        <input type="text" id="firstName" className="p-2 rounded-md text-black" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <label htmlFor="lastName" className="text-white flex flex-col mt-3">
        Last Name
        <input type="text" id="lastName" className="p-2 rounded-md text-black" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
      </label>

            <div className="mt-6">
              <ToggleButton checked={active} onChange={(e) => setActive(e.target.checked)}>
                <span className="text-white ml-2">Active</span>
                </ToggleButton>
            </div>

      <div className="flex justify-center  mt-6">
         <button type="button" className="yellowButton py-2 px-4  rounded-3xl font-bold  mb-2 mr-2 text-black" onClick={()=>{
            setIsOpen(false)
            setMode("add")
         }}>
            Back
          </button>

          <button type="submit" className="yellowButton py-2 px-4  rounded-3xl font-bold  mb-2 mr-2 text-black">
            {mode === "add" ? "Add Employee" : "Update Employee"}
          </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
