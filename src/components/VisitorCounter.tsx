import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, VISIT_URL } from "../config/api";

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Catat visitor (POST)
    axios.post(VISIT_URL, null, {
      withCredentials: false, // set true jika backend pakai session
    })
    .then((res) => {
      console.log("Visitor tracked:", res.data);
    })
    .catch((err) => {
      console.error("Failed to post visitor:", err);
    });

    // 2. Ambil total visitor (GET)
    axios.get(API_URL)
      .then((res) => {
        if (res.data && typeof res.data.total_unique_visitors_today === "number") {
          setCount(res.data.total_unique_visitors_today);
        } else {
          console.warn("Unexpected API response:", res.data);
          setCount(0);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to get visitor count:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 p-[2px] shadow-2xl backdrop-blur-sm w-fit mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      
      <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-2xl px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>

          <div className="text-white">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-purple-300 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Loading...
                </span>
              </div>
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                  {count ?? 0}
                </span>
                <span className="text-sm font-medium text-gray-300">
                  visitor{(count ?? 0) !== 1 ? 's' : ''} today
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl -z-10"></div>
      </div>
    </div>
  );
};

export default VisitorCounter;
