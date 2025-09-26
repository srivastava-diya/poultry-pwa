import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Home, Users, ClipboardList, Bell, BarChart3, Eye, AlertTriangle, CheckCircle, RefreshCcw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { farmService } from "@/services/farmService";
import { flockService } from "@/services/flockService";
import { pigService } from "@/services/pigService";
import { cattleService } from "@/services/cattleService";
import { alertService } from "@/services/alertService";
import Sparkline from "@/components/ui/sparkline";
import { logService } from "@/services/logService";
import FarmCreateForm from "@/components/FarmCreateForm";


const Dashboard = () => {
  const { user, updateUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [farm, setFarm] = useState(null);
  const [flocks, setFlocks] = useState([]);
  const [pigs, setPigs] = useState([]);
  const [cattle, setCattle] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedType, setSelectedType] = useState("poultry");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [showCreateFarm, setShowCreateFarm] = useState(false);
  const [linkFarmId, setLinkFarmId] = useState("");

  const totalGroups = useMemo(() => flocks.length + pigs.length + cattle.length, [flocks, pigs, cattle]);

  const alerts24h = useMemo(() => {
    const since = Date.now() - 24 * 60 * 60 * 1000;
    return alerts.filter((a) => new Date(a.createdAt).getTime() >= since).length;
  }, [alerts]);

  const stats = [
    { label: "Your Farm", value: farm?.name || "-", icon: Home, change: "", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Total Groups", value: String(totalGroups), icon: Users, change: "", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Alerts (24h)", value: String(alerts24h), icon: ClipboardList, change: "", color: "text-sky-600", bg: "bg-sky-50" },
    { label: "Active Alerts", value: String(alerts.length), icon: Bell, change: "", color: "text-rose-600", bg: "bg-rose-50" },
  ];

  const farmCompliance = useMemo(() => {
    const groups = [
      ...flocks.map(() => ({ compliance: 85 })),
      ...pigs.map(() => ({ compliance: 80 })),
      ...cattle.map(() => ({ compliance: 88 })),
    ];
    const avg = groups.length
      ? Math.round(groups.reduce((a, b) => a + b.compliance, 0) / groups.length)
      : 0;
    const risk = avg >= 90 ? "low" : avg >= 75 ? "medium" : "high";
    return [
      { name: farm?.name || "Your Farm", compliance: avg, risk, livestock: flocks.length * 100 + pigs.length * 20 + cattle.length * 50 },
    ];
  }, [farm, flocks, pigs, cattle]);

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProgressColor = (value) => {
    if (value > 90) return "bg-green-500";
    if (value > 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const loadData = async () => {
    if (!user?.farmId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      const [farmRes, flocksRes, pigsRes, cattleRes] = await Promise.all([
        farmService.getFarmById(user.farmId),
        flockService.getFlocksByFarm(user.farmId),
        pigService.getPigHerdsByFarm(user.farmId),
        cattleService.getCattleHerdsByFarm(user.farmId),
      ]);
      setFarm(farmRes);
      setFlocks(flocksRes || []);
      setPigs(pigsRes || []);
      setCattle(cattleRes || []);

      if (farmRes?.zipCode) {
        const alertsRes = await alertService.getAlertsByZip(farmRes.zipCode);
        setAlerts(alertsRes || []);
      } else {
        setAlerts([]);
      }

      const defaultGroupId = (flocksRes?.[0]?._id) || (pigsRes?.[0]?._id) || (cattleRes?.[0]?._id) || "";
      setSelectedGroup(defaultGroupId);
      setSelectedType(flocksRes?.[0]?._id ? "poultry" : pigsRes?.[0]?._id ? "pig" : cattleRes?.[0]?._id ? "cattle" : "poultry");
      if (defaultGroupId) {
        const logsRes = await logService.getLogsByGroup({ animalType: flocksRes?.[0]?._id ? "poultry" : pigsRes?.[0]?._id ? "pig" : "cattle", groupId: defaultGroupId });
        setLogs(logsRes);
      } else {
        setLogs([]);
      }
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.farmId]);

  return (
    <>
    <div className="space-y-8 p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-green-700 mb-1">
            PoultryNexus Farm Management Overview
          </h1>
          <p className="text-gray-500 text-sm">
            A comprehensive look at your operations, metrics, and health status.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-3">
          <Button variant="outline" className="bg-white" onClick={loadData}>
            <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md">
            <Link to="/reports">Generate Report</Link>
          </Button>
        </div>
      </div>

      {!user?.farmId && (
        <div className="bg-white border border-amber-200 p-6 rounded-2xl shadow-sm">
          <p className="text-amber-700 mb-4">No farm linked to your profile. Create your farm to get started.</p>
          {user?.role === "owner" ? (
            !showCreateFarm ? (
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setShowCreateFarm(true)}>Create Farm</Button>
            ) : (
              <FarmCreateForm
                onCreated={() => {
                  setShowCreateFarm(false);
                  loadData();
                }}
                onCancel={() => setShowCreateFarm(false)}
              />
            )
          ) : (
            <div className="space-y-3">
              <p className="text-sm">Have a farm ID? Link it to your profile.</p>
              <div className="flex gap-2">
                <input value={linkFarmId} onChange={(e)=>setLinkFarmId(e.target.value)} placeholder="Enter farm ID" className="border rounded px-3 py-2 flex-1" />
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={async ()=>{
                    if (!linkFarmId) return;
                    try {
                      setIsLoading(true);
                      const { authService } = await import("@/services/authService");
                      const updated = await authService.updateMe({ farmId: linkFarmId });
                      updateUser({ farmId: updated.farmId });
                    } finally {
                      setIsLoading(false);
                      loadData();
                    }
                  }}
                >
                  Link Farm
                </Button>
              </div>
              <Link to="/farms" className="text-emerald-700 hover:underline">Don’t have an ID? Ask your owner to share it.</Link>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(isLoading ? Array.from({ length: 4 }) : stats).map((stat, index) => (
          <Card key={index} className="hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {isLoading ? (
                  <div className="w-full flex items-center justify-between animate-pulse">
                    <div className="flex-1">
                      <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                      <div className="h-6 w-16 bg-gray-200 rounded mb-2" />
                      <div className="h-3 w-12 bg-gray-200 rounded" />
                    </div>
                    <div className="p-4 rounded-full bg-gray-100 h-12 w-12" />
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm font-semibold ${stat.color}`}>
                        {stat.change || "Live"}
                      </p>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Compliance & Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Farm Compliance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" />
              Farm Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-24 mb-4" />
                <div className="h-2 bg-gray-200 rounded w-full" />
              </div>
            ) : farmCompliance.map((farm, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <h4 className="font-semibold text-lg">{farm.name}</h4>
                  <p className="text-sm text-gray-500">
                    {farm.livestock.toLocaleString()} livestock
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {farm.compliance}%
                    </p>
                    <Progress value={farm.compliance} className="w-full h-2 rounded-full" indicatorClassName={getProgressColor(farm.compliance)} />
                  </div>
                  <Badge className={getRiskColor(farm.risk)} variant="secondary">
                    {farm.risk.charAt(0).toUpperCase() + farm.risk.slice(1)} Risk
                  </Badge>
                  <Button variant="outline" size="sm" asChild className="rounded-full">
                    <Link to={`/farms/${(farm.name || "farm").toLowerCase().replace(/\s/g, '-')}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {!isLoading && alerts.length > 0 && (
              <div className="mb-2">
                <Sparkline
                  points={[...Array(7)].map((_, i) => alerts.filter(a => {
                    const d = new Date();
                    d.setDate(d.getDate() - (6 - i));
                    const start = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
                    const end = start + 24 * 60 * 60 * 1000 - 1;
                    const ts = new Date(a.createdAt).getTime();
                    return ts >= start && ts <= end;
                  }).length)}
                />
                <p className="text-xs text-gray-500">Alerts over last 7 days</p>
              </div>
            )}
            {isLoading && (
              <div className="text-sm text-gray-500">Loading alerts...</div>
            )}
            {!isLoading && alerts.length === 0 && (
              <div className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-lg">
                <p className="text-sm text-gray-700">No active alerts in your area.</p>
              </div>
            )}
            {alerts.map((a, idx) => (
              <div key={idx} className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                <p className="font-medium text-red-800 text-sm">{farm?.name || "Farm"}</p>
                <p className="text-sm text-red-700">{a.title || a.message || "Alert"}</p>
                <p className="text-xs text-red-500 mt-1">{new Date(a.createdAt).toLocaleString()}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4 bg-white hover:bg-gray-100">
              <Link to="/alerts">View All Alerts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Compliance & Health Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-yellow-600" />
              Daily Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-gray-700">Check health logs for poultry, pigs, and cattle.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-gray-300" />
                <span className="text-gray-500">Verify water and feed supply levels.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-gray-300" />
                <span className="text-gray-500">Review new alerts and assign follow-ups.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Quick Links + Groups Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
              <Link to="/logs/add">New Daily Log</Link>
            </Button>
            <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white rounded-lg">
              <Link to="/records/add">Record Treatment</Link>
            </Button>
            <Button asChild className="bg-gray-700 hover:bg-gray-800 text-white rounded-lg">
              <Link to="/settings">View Settings</Link>
            </Button>
            <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg">
              <Link to="/incidents/report">Report Incident</Link>
            </Button>
            <div className="col-span-2 grid grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-lg border bg-white">
                <p className="text-gray-500">Poultry groups</p>
                <p className="text-2xl font-semibold text-gray-900">{flocks.length}</p>
              </div>
              <div className="p-3 rounded-lg border bg-white">
                <p className="text-gray-500">Pig herds</p>
                <p className="text-2xl font-semibold text-gray-900">{pigs.length}</p>
              </div>
              <div className="p-3 rounded-lg border bg-white">
                <p className="text-gray-500">Cattle herds</p>
                <p className="text-2xl font-semibold text-gray-900">{cattle.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span>Logs Summary</span>
              <div className="flex gap-3 items-center">
                <select
                  value={selectedType}
                  onChange={async (e) => {
                    const val = e.target.value;
                    setSelectedType(val);
                    const groups = val === "poultry" ? flocks : val === "pig" ? pigs : cattle;
                    const first = groups?.[0]?._id || "";
                    setSelectedGroup(first);
                    if (first) {
                      setIsLoading(true);
                      const logsRes = await logService.getLogsByGroup({ animalType: val, groupId: first });
                      setLogs(logsRes);
                      setIsLoading(false);
                    } else {
                      setLogs([]);
                    }
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="poultry">Poultry</option>
                  <option value="pig">Pig</option>
                  <option value="cattle">Cattle</option>
                </select>
                <select
                  value={selectedGroup}
                  onChange={async (e) => {
                    const id = e.target.value;
                    setSelectedGroup(id);
                    if (id) {
                      setIsLoading(true);
                      const logsRes = await logService.getLogsByGroup({ animalType: selectedType, groupId: id });
                      setLogs(logsRes);
                      setIsLoading(false);
                    } else {
                      setLogs([]);
                    }
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {(
                    selectedType === "poultry" ? flocks : selectedType === "pig" ? pigs : cattle
                  ).map((g) => (
                    <option key={g._id} value={g._id}>
                      {g.name || g.label || g._id?.slice(-6)}
                    </option>
                  ))}
                </select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && <div className="text-sm text-gray-500">Loading logs...</div>}
            {!isLoading && logs.length === 0 && (
              <div className="text-sm text-gray-500">No recent logs.</div>
            )}
            {!isLoading && logs.length > 0 && (
              <ul className="divide-y">
                {logs.map((log) => (
                  <li key={log._id} className="py-2 flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-800">{log.title || log.activity || "Log entry"}</p>
                      <p className="text-xs text-gray-500">{log.notes || log.description}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString()}</span>
                      <Link
                        to={`/logs/${selectedType}/${selectedGroup}`}
                        className="text-xs text-emerald-700 hover:underline"
                      >
                        View all
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
