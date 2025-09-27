import React, { useState, useEffect, Fragment } from "react";
import {
  Filter,
  RotateCcw,
  FileSpreadsheet,
  FileText,
  Check,
  ChevronDown,
} from "lucide-react";
import { Combobox, Transition } from "@headlessui/react";
import FancyDropdown from "../../browseTherapist/FancyDropdown.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StatusCardsSettlementReports from "./StatusCardsSettlementReports.jsx";

export default function SettlementReportsPage() {
  // draft filter states (UI controls)
  const [dateRange, setDateRange] = useState("Last 7 Days");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [therapist, setTherapist] = useState(null);
  const [paymentMode, setPaymentMode] = useState("All Modes");
  const [settlementStatus, setSettlementStatus] = useState("All Status");

  // applied filters (sent to API)
  const [appliedFilters, setAppliedFilters] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  // therapist search
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch therapists
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const fetchTherapists = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${apiUrl}/therapist/getalltherapistsnames?q=${query}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.success) setSuggestions(data.data || []);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchTherapists, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  // helper: build filters object
  const buildFilters = () => {
    let startDate, endDate;

    if (dateRange === "Last 7 Days") {
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
    } else if (dateRange === "Last 30 Days") {
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);
    } else if (dateRange === "Custom Range") {
      startDate = customStartDate;
      endDate = customEndDate;
    }

    return {
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,
      endDate: endDate ? endDate.toISOString().split("T")[0] : null,
      therapistId: therapist?.id || null,
      paymentMode: paymentMode !== "All Modes" ? paymentMode : null,
      settlementStatus: settlementStatus !== "All Status" ? settlementStatus : null,
    };
  };

  return (
    <div>
      <section className="bg-[#0d0d0d] min-h-screen py-6 px-6">
        {/* Header */}
        <div className="mx-auto border-b border-[#1a1a1a] pb-4 mb-6">
          <h1 className="text-xl font-semibold text-primary">
            Payment Settlement Report
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track bookings, commissions, and settlement status
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-[#111] p-6 rounded-lg shadow-lg border border-[#1a1a1a]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Date Range */}
            <div className="col-span-1">
              <FancyDropdown
                label="Date Range"
                options={["Last 7 Days", "Last 30 Days", "Custom Range"]}
                value={dateRange}
                onChange={setDateRange}
              />

              {/* Show custom date pickers */}
              {dateRange === "Custom Range" && (
                <div className="mt-3 flex gap-2">
                  <div className="flex flex-col w-1/2">
                    <label className="text-xs text-gray-400 mb-1">Start</label>
                    <DatePicker
                      selected={customStartDate}
                      onChange={(date) => setCustomStartDate(date)}
                      selectsStart
                      startDate={customStartDate}
                      endDate={customEndDate}
                      className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Start date"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label className="text-xs text-gray-400 mb-1">End</label>
                    <DatePicker
                      selected={customEndDate}
                      onChange={(date) => setCustomEndDate(date)}
                      selectsEnd
                      startDate={customStartDate}
                      endDate={customEndDate}
                      minDate={customStartDate}
                      className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="End date"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Therapist Searchable Dropdown */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Therapist
              </label>
              <Combobox value={therapist} onChange={setTherapist}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-md bg-black/60 border border-white/10 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-black"
                    placeholder="Search therapist..."
                    displayValue={(t) => t?.name || ""}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Combobox.Options className="absolute mt-2 w-full rounded-md bg-[#0d0d0d] border border-white/10 shadow-lg z-50 max-h-48 overflow-y-auto">
                      {loading && (
                        <div className="px-3 py-2 text-sm text-gray-400">
                          Loading...
                        </div>
                      )}
                      {!loading && suggestions.length === 0 && query !== "" && (
                        <div className="px-3 py-2 text-sm text-gray-400">
                          No results
                        </div>
                      )}
                      {suggestions.map((t) => (
                        <Combobox.Option
                          key={t.id}
                          value={t}
                          className={({ active }) =>
                            `cursor-pointer select-none px-3 py-2 text-sm ${active
                              ? "bg-primary/20 text-primary"
                              : "text-gray-200"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div className="flex justify-between items-center">
                              <span>{t.name}</span>
                              {selected && (
                                <Check className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          )}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </div>

            {/* Payment Mode */}
            <FancyDropdown
              label="Payment Mode"
              options={["All Modes", "Cash", "Card", "UPI"]}
              value={paymentMode}
              onChange={setPaymentMode}
            />

            {/* Settlement Status */}
            <FancyDropdown
              label="Settlement Status"
              options={["All Status", "Settled", "Pending"]}
              value={settlementStatus}
              onChange={setSettlementStatus}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="flex items-center gap-2 bg-primary text-black font-medium px-4 py-2 rounded-md hover:opacity-90 transition"
              onClick={() => setAppliedFilters(buildFilters())}
            >
              <Filter className="w-4 h-4" /> Apply Filters
            </button>

            <button
              className="flex items-center gap-2 bg-[#1a1a1a] text-gray-300 font-medium px-4 py-2 rounded-md hover:bg-[#222] transition"
              onClick={() => {
                setDateRange("Last 7 Days");
                setCustomStartDate(null);
                setCustomEndDate(null);
                setTherapist(null);
                setQuery("");
                setPaymentMode("All Modes");
                setSettlementStatus("All Status");
                setAppliedFilters(null); // clear applied filters
              }}
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>

            <div className="ml-auto flex gap-3">
              <button className="flex items-center gap-2 bg-green-600 text-white font-medium px-4 py-2 rounded-md hover:bg-green-700 transition">
                <FileSpreadsheet className="w-4 h-4" /> Export Excel
              </button>
              <button className="flex items-center gap-2 bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 transition">
                <FileText className="w-4 h-4" /> Export PDF
              </button>
            </div>
          </div>
        </div>

        {/* Show summary only after Apply Filters */}
        {appliedFilters && (
          <StatusCardsSettlementReports filters={appliedFilters} />
        )}
      </section>
    </div>
  );
}
