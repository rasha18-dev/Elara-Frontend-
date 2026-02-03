import { useState } from "react";

export default function FilterSidebar({ close }) {
  const [active, setActive] = useState("Category"); // default first

  return (
    <div
      className="fixed top-20 left-0 h-full z-50"
      onMouseLeave={() => {
        setActive(null);
        close();
      }}
    >
      <div className="flex h-full bg-white shadow-lg overflow-hidden">

        {/* LEFT MENU */}
        <div className="w-72 border-r border-gray-200">
          {/* HEADER */}
          <div className="px-6 pt-6 pb-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-[#4A1F2D] flex items-center gap-2">
              All Jewellery
            </h2>
            <div className="w-28 h-[3px] bg-[#4A1F2D] mt-2 rounded"></div>
          </div>

          {/* MENU LIST */}
          <ul className="px-6 py-6 space-y-3 text-lg">
            {["Category", "Price", "Occasion", "Gender"].map((item) => (
              <MenuItem
                key={item}
                label={item}
                active={active}
                setActive={setActive}
              />
            ))}
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`
            w-72 bg-[#FAFAFA] border-l border-gray-200
            transition-transform duration-300 ease-out
            ${active ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {active && <PanelContent title={active} />}
        </div>

      </div>
    </div>
  );
}

function MenuItem({ label, active, setActive }) {
  const isActive = active === label;

  return (
    <li
      onMouseEnter={() => setActive(label)}
      className={`
        cursor-pointer px-4 py-3 rounded-xl
        transition-colors duration-200
        ${isActive
          ? "bg-[#4A1F2D]/10 text-[#4A1F2D]"
          : "text-black hover:text-[#4A1F2D]"
        }
      `}
    >
      {label}
    </li>
  );
}

function PanelContent({ title }) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-[#4A1F2D] mb-4">
        {title}
        <span className="block w-10 h-[2px] bg-[#4A1F2D] mt-2 rounded"></span>
      </h3>

      <ul className="space-y-3 text-black">
        {getItems(title).map((item) => (
          <li
            key={item}
            className="cursor-pointer transition-colors hover:text-[#4A1F2D]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function getItems(title) {
  switch (title) {
    case "Category":
      return ["Rings", "Earrings", "Necklace", "Bangles"];
    case "Price":
      return ["Below ₹10,000", "₹10,000 – ₹50,000", "Above ₹50,000"];
    case "Occasion":
      return ["Wedding", "Party", "Daily Wear"];
    case "Gender":
      return ["Women", "Men", "Kids"];
    default:
      return [];
  }
}
// 