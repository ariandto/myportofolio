import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/api"; 

const VisitorCounter: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => {
        setCount(res.data.total_unique_visitors_today);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-2 shadow text-white font-semibold text-center w-fit mx-auto">
      {loading ? (
        <span>Loading visitor...</span>
      ) : (
        <span>
          <strong>{count ?? 0}</strong> visitor unik hari ini
        </span>
      )}
    </div>
  );
};

export default VisitorCounter;
