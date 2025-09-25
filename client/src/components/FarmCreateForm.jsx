import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { farmService } from "@/services/farmService";
import { flockService } from "@/services/flockService";
import { pigService } from "@/services/pigService";
import { cattleService } from "@/services/cattleService";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/services/authService";

const FarmCreateForm = ({ onCreated, onCancel }) => {
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [type, setType] = useState("poultry");
  const [breed, setBreed] = useState("");
  const [acquisitionDate, setAcquisitionDate] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { updateUser } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const farm = await farmService.createFarm({ name, zipCode });
      await authService.updateMe({ farmId: farm._id });
      const fresh = await authService.getMe(localStorage.getItem("token"));
      updateUser(fresh);

      // Create initial group based on type
      const base = { name: `${name} ${type} group`, breed, acquisitionDate, farmId: farm._id, status: "active" };
      if (type === "poultry") {
        await flockService.createFlock({ ...base, initialCount: Number(count || 0) });
      } else if (type === "pig") {
        await pigService.createPigHerd({ ...base, count: Number(count || 0) });
      } else if (type === "cattle") {
        await cattleService.createCattleHerd({ ...base, initialCount: Number(count || 0) });
      }
      onCreated && onCreated(farm);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to create farm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <div className="text-sm text-rose-600">{error}</div>
      )}
      <div>
        <Label htmlFor="name">Farm Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., Sunny Acres" />
      </div>
      <div>
        <Label htmlFor="zip">Zip Code</Label>
        <Input id="zip" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required placeholder="e.g., 560001" />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <select id="type" className="border rounded px-2 py-2 w-full" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="poultry">Poultry</option>
          <option value="pig">Pig</option>
          <option value="cattle">Cattle</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="breed">Breed</Label>
          <Input id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} required placeholder="e.g., Cobb 500" />
        </div>
        <div>
          <Label htmlFor="date">Acquisition Date</Label>
          <Input id="date" type="date" value={acquisitionDate} onChange={(e) => setAcquisitionDate(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="count">Initial Count</Label>
          <Input id="count" type="number" min="0" value={count} onChange={(e) => setCount(e.target.value)} required placeholder="e.g., 100" />
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white">
          {loading ? "Creating..." : "Create Farm"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
};

export default FarmCreateForm;


