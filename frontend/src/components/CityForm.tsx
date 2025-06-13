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
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Add New City</h2>
      <input
        type="text"
        placeholder="City Name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        required
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Count"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add</button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "1.5rem",
    borderRadius: "8px",
    backgroundColor: "#f1f1f1",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#333",
    marginBottom: "0.5rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

