import React, { useState } from "react";
import { City } from "../App";

type Props = {
  onCreate: (city: Omit<City, "id">) => void;
};

export default function CityForm({ onCreate }: Props) {
  const [cityName, setCityName] = useState("");
  const [count, setCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ cityName, count });
    setCityName("");
    setCount(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New City</h2>
      <input
        type="text"
        placeholder="City Name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Count"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}
