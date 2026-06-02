import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";



export const ScrollToTopButton = () => {

  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);



  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-2xl bg-indigo-600 text-white  hover:bg-indigo-700 hover:-translate-y-1 cursor-pointer transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
};