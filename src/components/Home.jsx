import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import FilterComponent from "./Filter";
import { format } from "date-fns";
import HorizontalBarChart from "./BarChart";
import LineChart from "./LineChart";
import { useCookies } from "react-cookie";
import queryString from "query-string";
import { useAuth } from "../context/authContext";

function Home() {
  const [data, setData] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["userPreferences"]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { logout } = useAuth();
  const [filters, setFilters] = useState({
    age: "",
    gender: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    // Check URL for filters
    const parsedUrl = queryString.parse(window.location.search);
    const urlFilters = {
      age: parsedUrl.age || "",
      gender: parsedUrl.gender || "",
      startDate: parsedUrl.startDate ? new Date(parsedUrl.startDate) : null,
      endDate: parsedUrl.endDate ? new Date(parsedUrl.endDate) : null,
    };

    // Check cookies and prioritize URL filters
    const cookieFilters = cookies.userPreferences
      ? cookies.userPreferences
      : {};
    const activeFilters = { ...cookieFilters, ...urlFilters };

    setFilters(activeFilters);
    fetchData(activeFilters);
  }, []);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const fetchData = async ({ age, gender, startDate, endDate }) => {
    try {
      const response = await axios.get(
        "https://analytics-dashboard-be.vercel.app/api/data",
        {
          params: { age, gender, startDate, endDate },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onFilterSubmit = (filters) => {
    const formattedFilters = {
      ...filters,
      startDate: format(filters.startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      endDate: format(filters.endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };

    // Update cookies
    setCookie("userPreferences", JSON.stringify(formattedFilters), {
      path: "/",
      maxAge: 3600,
    });

    // Update URL
    const newQueryString = queryString.stringify(formattedFilters);
    window.history.replaceState(null, "", `?${newQueryString}`);

    fetchData(formattedFilters);
  };

  const clearPreferences = () => {
    removeCookie("userPreferences", { path: "/" });
    setFilters({ age: "", gender: "", startDate: null, endDate: null });
    setData([]);
    window.history.replaceState(null, "", window.location.pathname); // Clear URL parameters
  };

  return (
    <>
      <div className="top_nav">
        <FilterComponent
          onFilterSubmit={onFilterSubmit}
          filters={filters}
          clearPreferences={clearPreferences}
        />
        <button onClick={() => logout()}>Logout</button>
      </div>

      <div className="chart_wrapper">
        <HorizontalBarChart
          data={data}
          onSelectCategory={handleSelectCategory}
        />
        {selectedCategory && (
          <LineChart data={data} selectedCategory={selectedCategory} />
        )}
      </div>
    </>
  );
}

export default Home;
