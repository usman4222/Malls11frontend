import { AlertTriangle, CheckCircle } from "lucide-react"; 
import { Button } from "../../SiteComponents/ui/button";
import { useNavigate } from "react-router-dom";

const Dialog = ({
  isOpen,
  title,
  children,
  disclaimerType,
  onProceed,
  onClose,
  navigateTo, // Prop to handle dynamic navigation
}) => {
  const navigate = useNavigate(); // Initialize navigate hook

  if (!isOpen) return null;

  const isDanger = disclaimerType === "danger"; 

  const handleProceed = () => {
    // Perform additional checks if needed
    if (navigateTo) {
      navigate(navigateTo); // Use navigate hook to navigate to the provided route
    }

    if (onProceed) {
      onProceed(); // Call onProceed if passed
    }

    if (onClose) {
      onClose(); // Close the dialog after proceeding
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="mt-4">
          <div className="flex justify-center mb-4">
            {isDanger ? (
              <AlertTriangle size={48} className="text-red-500" />
            ) : (
              <CheckCircle size={48} className="text-green-500" />
            )}
          </div>

          <div className="text-center mb-6">
            <p>{children}</p>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleProceed}
              variant="contained"
              color={isDanger ? "danger" : "success"}
              className={`${
                isDanger
                  ? "hover:bg-red-600 hover:text-white"
                  : "hover:bg-emerald-600 hover:text-white"
              }`}
            >
              {isDanger ? "Proceed with Caution" : "Proceed"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
