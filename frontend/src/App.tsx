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
    <div style={{ padding: "2rem" }}>
      <h1>City Search</h1>
      <input
        type="text"
        value={search}
        placeholder="Search city..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <CityForm onCreate={handleCreate} />
      <CityList cities={cities} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
}

export default App;
