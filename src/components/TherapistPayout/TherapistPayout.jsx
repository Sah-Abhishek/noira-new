
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TherapistPayout() {
  const options = ["This Week", "This Month", "Custom Range"];
  const [selected, setSelected] = useState("This Week");

  // For custom range
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="bg-[#111] px-6 py-4 flex items-center justify-between">
      {/* Left side title */}
      <div>
        <h1 className="text-xl font-bold text-primary">My Payment Settlement</h1>
        <p className="text-sm text-gray-400">
          Track your earnings, bookings, and settlement status
        </p>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-4">
        {/* Dropdown */}
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative w-40">
            <Listbox.Button className="w-full flex items-center justify-between rounded-md bg-[#111] border border-white/10 px-3 py-2 text-sm text-gray-200 hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-black">
              <span>{selected}</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Listbox.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-75"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Listbox.Options className="absolute mt-2 w-full rounded-md bg-[#0d0d0d] border border-white/10 shadow-lg focus:outline-none z-50 overflow-hidden">
                {options.map((opt, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={opt}
                    className={({ active, selected }) =>
                      `relative cursor-pointer select-none px-3 py-2 text-sm ${active
                        ? "bg-primary/20 text-primary"
                        : "text-gray-200"
                      } ${selected ? "font-semibold" : ""}`
                    }
                  >
                    {({ selected }) => (
                      <div className="flex justify-between items-center">
                        <span>{opt}</span>
                        {selected && <Check className="h-4 w-4 text-primary" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Custom Date Range */}
        {selected === "Custom Range" && (
          <div className="flex items-center gap-2 bg-[#111] px-3 py-2 rounded-md border border-white/10">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="bg-transparent text-gray-200 text-sm focus:outline-none cursor-pointer"
            />
            <span className="text-gray-400">-</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="bg-transparent text-gray-200 text-sm focus:outline-none cursor-pointer"
            />
          </div>
        )}

        {/* Notification & Avatar */}
      </div>
    </div>
  );
}
