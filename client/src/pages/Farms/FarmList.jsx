import React, { useEffect, useState } from "react";
import { farmService } from "../../services/farmService";

const FarmList = () => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const data = await farmService.getFarms();
        setFarms(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFarms();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Farms</h1>
      <div className="grid grid-cols-3 gap-4">
        {farms.map((farm) => (
          <div key={farm._id} className="p-4 bg-white rounded shadow">
            <h2 className="font-bold">{farm.name}</h2>
            <p>Zip Code: {farm.zipCode}</p>
            <p>Owner: {farm.owner?.name || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmList;
