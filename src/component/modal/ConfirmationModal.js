
import { IoMdTrash,IoMdClose } from "react-icons/io";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName = "this item",
  cancelText = "Cancel",
  CTA = "Delete Product",
  title,
}) {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm p-2
        transition-opacity duration-200
        ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      {/* Modal box */}
      <div
        className={`
          bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative
          transition-all duration-200 ease-out
          ${isOpen
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-1"}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <IoMdClose className="size-5" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <IoMdTrash className="w-6 h-6 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-800">
            {title || "Confirm Deletion"}
          </h2>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-900">{itemName}</span>? This
          action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
          >
            {CTA}
          </button>
        </div>
      </div>
    </div>
  );
}
