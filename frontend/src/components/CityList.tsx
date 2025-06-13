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
    <div>
      <h2>Results</h2>
      <ul>
        {cities.map((city) => (
          <li key={city.id}>
            {editId === city.id ? (
              <>
                <input
                  value={editData.cityName || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, cityName: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editData.count || 0}
                  onChange={(e) =>
                    setEditData({ ...editData, count: Number(e.target.value) })
                  }
                />
                <button onClick={handleSave}>💾 Save</button>
              </>
            ) : (
              <>
                {city.cityName} ({city.count})
                <button onClick={() => handleEdit(city)}>✏️ Edit</button>
              </>
            )}
            <button onClick={() => onDelete(city.id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
