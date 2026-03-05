import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../modal/ConfirmationModal";

const ClientList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  // search + pagination state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // delete modal state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

 const fetchUsers = async () => {
  try {
    const res = await axiosInstance.get("users", {
      params: { search: debouncedSearch, page, limit },
    });

    if (res.status === 200) {
      setUsers(res.data.users);
      setTotalPages(res.data.pagination.totalPages);
    }
  } catch (error) {
    toast.error("Failed to fetch users");
  }
};

  useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(search);
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

  // refetch when search or page changes
  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, page]);

  const handleDeleteUser = async (id) => {
    if (!id) return;

    try {
      const res = await axiosInstance.delete(`user/${id}`);
      if (res.status === 200) {
        toast.success("User deleted successfully");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setIsConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => handleDeleteUser(userToDelete)}
        title="Delete User"
        itemName="this user"
        CTA="Delete User"
      />

      <div className="text-white max-w-4xl w-full overflow-y-auto  overflow-x-auto max-h-[80vh] p-2">
        {/* Header */}
        <h1 className="md:text-3xl text-xl uppercase font-bold text-center mb-4">
          Users
        </h1>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by username, name or phone"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1); // reset page on new search
            }}
            className="w-full p-2 rounded-md text-black"
          />
        </div>

        {/* Table */}
        <table className="w-full border border-gray-700 rounded-lg">
          <thead className="flex">
            <th className="flex-1 p-2 text-start">Name</th>
            <th className="flex-1 p-2">Username</th>
            <th className=" p-2">Options</th>
          </thead>

          <tbody>
            {users.length === 0 && (
              <tr className="p-4 text-center text-gray-400">
                No users found
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user.id}
                 onClick={() => {
                     navigate(`/admin/client/${encodeURIComponent(user.userName)}`)
                    }}
                className="flex justify-between items-center border-t border-gray-700 p-2 cursor-pointer"
              >
                <td className="flex-1 capitalize">
                  {user.firstName} {user.lastName}
                </td>

                <td className="flex-1 text-center">{user.userName}</td>

                <td className=" flex justify-center">
                  {user.phoneNumber}
                  {/* <button
                    className="px-2 py-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => {
                     navigate(`/admin/client/${encodeURIComponent(user.userName)}`)
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="px-2 py-2 rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => {
                      setUserToDelete(user.id);
                      setIsConfirmOpen(true);
                    }}
                  >
                    <FaTrashAlt />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page === 1}
            onClick={() => {
                setPage((p) => p - 1)
            }}
            className="px-3 py-1 rounded-md bg-gray-700 disabled:opacity-40"
          >
            Prev
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 rounded-md bg-gray-700 disabled:opacity-40"
          >
            Next
          </button>
        </div>

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

export default ClientList;
