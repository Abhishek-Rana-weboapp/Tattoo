import { useEffect } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import EmployeeForm from "../forms/EmployeeForm";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../modal/ConfirmationModal";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axiosInstance.get("employee");
        if (response.status === 200) {
          setEmployees(response.data.employees);
        }
      } catch (error) {
        toast.error("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (id) => {
    if (!id) return;
    try {
      const response = await axiosInstance.delete(`employee/${id}`);
      if (response.status === 200) {
        toast.success("Employee deleted successfully");
        setEmployees(employees.filter((emp) => emp.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete employee");

    }finally{
      setIsConfirmOpen(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleDeleteEmployee(employeeToDelete)}
        title={"Delete Employee"}
        itemName="this Employee"
        CTA="Delete Employee"
      />
      <div className="text-white max-w-3xl w-full">
        <div className="mb-5 relative">
          <h1 className=" md:text-3xl text-xl uppercase font-bold  text-center">
            Employees
          </h1>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 rounded-md"
            onClick={() => {
              setFormMode("add");
              setIsFormOpen(true);
            }}
          >
            <FaPlus className="size-5" />
          </button>
        </div>

        {isFormOpen ? (
          <EmployeeForm
            setEmployees={setEmployees}
            setSelectedEmployee={setSelectedEmployee}
            selectedEmployee={selectedEmployee}
            mode={formMode}
            setMode={setFormMode}
            setIsOpen={setIsFormOpen}
          />
        ) : (
          employees?.length > 0 ? <table className="max-w-3xl w-full border border-gray-700 rounded-lg">
            <thead className="flex">
              <th className="w-2/4 p-2 text-start ">Name</th>
              <th className="w-1/4 p-2">Status</th>
              <th className="w-1/4 p-2">Options</th>
            </thead>

            <tbody>
              {employees.map((emp) => (
                <tr
                  key={emp.id}
                  className="flex justify-between items-center border-t border-gray-700 p-2"
                >
                  <td className="w-2/4 text-white capitalize">
                    {emp.firstName} {emp?.lastName}
                  </td>
                  <td className="w-1/4 text-center">
                    {emp.active ? "Active" : "Inactive"}
                  </td>
                  <td className="w-1/4 flex justify-center items-center">
                    <button
                      className=" text-white px-2 py-2 rounded-md hover:bg-yellow-600 transition-colors"
                      onClick={() => {
                        setFormMode("edit");
                        setSelectedEmployee(emp);
                        setIsFormOpen(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className=" text-white px-2 py-2 rounded-md hover:bg-red-600 transition-colors"
                      onClick={() => {
                        setEmployeeToDelete(emp.id);
                        setIsConfirmOpen(true);
                      }}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> : <p className="text-center text-gray-400">No employees found</p>
        )}

        <button
          className="yellowButton py-2 px-4  rounded-3xl font-bold  mb-2 mr-2 text-black absolute bottom-5 left-1/2 -translate-x-1/2"
          onClick={() => {
            navigate(-1);
          }}
        >
          Prev
        </button>
      </div>
    </>
  );
};

export default EmployeeList;
