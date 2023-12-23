import { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
// openModal
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowContent(false);
  };

  const openContent = () => {
    setShowContent(true);
  };

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-green-500 text-white px-4 py-2 rounded focus:outline-none"
      >
        Open Modal
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-6 md:p-8 rounded shadow-md text-center max-w-md w-full">
            {showContent ? (
              <>
                <h2 className="text-xl font-semibold mb-4">Modal Content</h2>
                <div className="flex justify-center mb-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 transition duration-300 hover:bg-blue-600">
                    Button 1
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600">
                    Button 2
                  </button>
                  {/* Add more buttons or content here */}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Choose an option</h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-600"
                  onClick={openContent}
                >
                  Open Content
                </button>
              </>
            )}
            <div className="flex justify-center mt-4">
              {showContent && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600"
                  onClick={closeModal}
                >
                  Close Modal
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
