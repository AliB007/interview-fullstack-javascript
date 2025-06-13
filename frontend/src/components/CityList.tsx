import React, { useState } from "react";
import { City } from "../App";

type Props = {
  cities: City[];
  onUpdate: (id: string, data: Partial<City>) => void;
  onDelete: (id: string) => void;
};

export default function CityList({ cities, onUpdate, onDelete }: Props) {
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<City>>({});

  const handleEdit = (city: City) => {
    setEditId(city.id);
    setEditData({ cityName: city.cityName, count: city.count });
  };

  const handleSave = () => {
    if (editId) {
      onUpdate(editId, editData);
      setEditId(null);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Results</h2>
      <ul style={styles.list}>
        {cities.map((city) => (
          <li key={city.id} style={styles.listItem}>
            {editId === city.id ? (
              <div style={styles.editForm}>
                <input
                  type="text"
                  value={editData.cityName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, cityName: e.target.value })
                  }
                  style={styles.input}
                />
                <input
                  type="number"
                  value={editData.count || 0}
                  onChange={(e) =>
                    setEditData({ ...editData, count: Number(e.target.value) })
                  }
                  style={styles.input}
                />
                <button onClick={handleSave} style={styles.button}>
                  💾 Save
                </button>
              </div>
            ) : (
              <>
                <span style={styles.cityInfo}>
                  {city.cityName} ({city.count})
                </span>
                <div style={styles.actions}>
                  <button onClick={() => handleEdit(city)} style={styles.button}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => onDelete(city.id)} style={styles.deleteButton}>
                    🗑 Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
  },
  heading: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "1rem",
    color: "#222",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    backgroundColor: "#fff",
    marginBottom: "1rem",
    padding: "1rem",
    borderRadius: "6px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
    display: "flex",
    flexDirection: "column",
  },
  editForm: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    flex: "1",
  },
  cityInfo: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
    color: "#333",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
  },
  button: {
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#eee",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  deleteButton: {
    padding: "0.4rem 0.8rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#fdd",
    cursor: "pointer",
    transition: "background 0.2s",
  },
};

