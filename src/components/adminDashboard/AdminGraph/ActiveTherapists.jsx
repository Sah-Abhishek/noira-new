import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, TrendingUp, AlertCircle } from "lucide-react";

export default function TherapistGraph() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiUrl}/admin/graph/therapist`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const formattedData = result.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          therapists: item.therapistCount,
          fullDate: item.date,
        }));

        setData(formattedData);
        setDateRange(result.range);
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateRange = () => {
    if (!dateRange) return "";
    const start = new Date(dateRange.startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const end = new Date(dateRange.endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${start} - ${end}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-400 font-medium">Loading therapist data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0d0d0d]">
        <div className="bg-[#111] rounded-xl shadow-lg p-8 max-w-md border border-primary/20">
          <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2 text-center">
            Error Loading Data
          </h2>
          <p className="text-gray-400 text-center mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="w-full bg-primary text-black py-2 px-4 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const totalTherapists = data.reduce((sum, item) => sum + item.therapists, 0);
  const avgTherapists = (totalTherapists / data.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[#0d0d0d] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#111] rounded-xl shadow-xl p-8 border border-primary/20">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-primary" />
              Active Therapists Over Time
            </h1>
            {dateRange && (
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4 text-primary/80" />
                <span className="text-sm">{formatDateRange()}</span>
                {dateRange.defaulted && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    Default Range
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[#0d0d0d] rounded-lg p-4 border border-primary/20 text-primary">
              <p className="text-primary/70 text-sm mb-1">Total Active</p>
              <p className="text-3xl font-bold text-white">{totalTherapists}</p>
            </div>
            <div className="bg-[#0d0d0d] rounded-lg p-4 border border-primary/20 text-primary">
              <p className="text-primary/70 text-sm mb-1">Average Daily</p>
              <p className="text-3xl font-bold text-white">{avgTherapists}</p>
            </div>
            <div className="bg-[#0d0d0d] rounded-lg p-4 border border-primary/20 text-primary">
              <p className="text-primary/70 text-sm mb-1">Days Tracked</p>
              <p className="text-3xl font-bold text-white">{data.length}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[#0d0d0d] rounded-lg p-4 border border-primary/20">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis
                  dataKey="date"
                  stroke="#aaa"
                  style={{ fontSize: "12px" }}
                />
                <YAxis
                  stroke="#aaa"
                  style={{ fontSize: "12px" }}
                  label={{
                    value: "Active Therapists",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#aaa",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                  labelStyle={{ color: "#fff", fontWeight: "bold" }}
                  itemStyle={{ color: "#fff" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px", color: "#aaa" }}
                  iconType="line"
                />
                <Line
                  type="monotone"
                  dataKey="therapists"
                  stroke="#ffffff"
                  strokeWidth={3}
                  dot={{ fill: "#ffffff", r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Active Therapists"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Refresh Button */}
          {/* <div className="mt-6 text-center"> */}
          {/*   <button */}
          {/*     onClick={fetchData} */}
          {/*     className="bg-primary text-black py-2 px-6 rounded-lg hover:opacity-90 transition font-semibold" */}
          {/*   > */}
          {/*     Refresh Data */}
          {/*   </button> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
