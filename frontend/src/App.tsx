import React, { useEffect, useState } from "react";
import axios from "axios";
import CityList from "./components/CityList";
import CityForm from "./components/CityForm";

export type City = {
  id: string;
  cityName: string;
  count: number;
};

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState("");

  const fetchCities = async () => {
    const res = await axios.get(`/cities?search=${search}`);
    setCities(res.data);
  };

  useEffect(() => {
    fetchCities();
  }, [search]);

  const handleCreate = async (city: Omit<City, "id">) => {
    const res = await axios.post("/cities", city);
    fetchCities();
  };

  const handleUpdate = async (id: string, data: Partial<City>) => {
    await axios.put(`/cities/${id}`, data);
    fetchCities();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`/cities/${id}`);
    fetchCities();
  };

  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h1 style={styles.heading}>City Search</h1>

      <input
        type="text"
        value={search}
        placeholder="Search city..."
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />

      <CityForm onCreate={handleCreate} />
      <CityList cities={cities} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  </div>
);
}


const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
    padding: "2rem",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  searchInput: {
    width: "100%",
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    marginBottom: "1.5rem",
  },
};

export default App;
