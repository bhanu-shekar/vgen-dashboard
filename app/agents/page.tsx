"use client"

import { 
  Users, 
  Activity, 
  Zap, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"

const usageData = [
  { name: "Mon", usage: 2400, cost: 400 },
  { name: "Tue", usage: 1398, cost: 300 },
  { name: "Wed", usage: 9800, cost: 2000 },
  { name: "Thu", usage: 3908, cost: 800 },
  { name: "Fri", usage: 4800, cost: 1100 },
  { name: "Sat", usage: 3800, cost: 700 },
  { name: "Sun", usage: 4300, cost: 900 },
]

const modelData = [
  { name: "GPT-4o", value: 45, color: "#6366f1" },
  { name: "Claude 3.5", value: 30, color: "#10b981" },
  { name: "Llama 3", value: 15, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#94a3b8" },
]

const recentAgents = [
  { name: "Support AI", status: "Active", usage: "12,340", latency: "1.2s", success: "99.2%" },
  { name: "Sales Bot", status: "Inactive", usage: "4,221", latency: "0.8s", success: "94.5%" },
  { name: "Marketing GPT", status: "Active", usage: "8,993", latency: "2.1s", success: "98.1%" },
]

export default function EnhancedAgentsPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 bg-slate-50/50 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Analytics</h1>
          <p className="text-muted-foreground text-sm">Real-time performance and resource monitoring.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Download Report</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Deploy New Agent</Button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Agents" value="24" icon={<Users className="w-4 h-4" />} trend="+2" trendType="up" />
        <KPICard title="Active Sessions" value="18" icon={<Activity className="w-4 h-4 text-green-500" />} trend="94% uptime" trendType="neutral" />
        <KPICard title="Avg Latency" value="1.2s" icon={<Zap className="w-4 h-4 text-yellow-500" />} trend="-12%" trendType="up" />
        <KPICard title="Monthly Spend" value="$12,430" icon={<DollarSign className="w-4 h-4 text-indigo-500" />} trend="+18%" trendType="down" />
      </div>

      {/* PRIMARY CHARTS */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Usage Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Load</CardTitle>
            <CardDescription>Request volume vs Operational Cost (USD)</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Model Distribution (The New Analytic) */}
        <Card>
          <CardHeader>
            <CardTitle>Model Distribution</CardTitle>
            <CardDescription>Traffic share by LLM provider</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={modelData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {modelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4 w-full text-xs">
              {modelData.map((m) => (
                <div key={m.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.color }} />
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AGENT STATUS TABLE */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Live Agent Registry</CardTitle>
            <CardDescription>Detailed health and throughput metrics</CardDescription>
          </div>
          <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50">
                <TableHead className="font-semibold">Agent Name</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Throughput</TableHead>
                <TableHead className="font-semibold text-right">Avg Latency</TableHead>
                <TableHead className="font-semibold text-right">Success Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAgents.map((agent) => (
                <TableRow key={agent.name} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>
                    <Badge variant={agent.status === "Active" ? "outline" : "secondary"} className={agent.status === "Active" ? "border-green-500 text-green-600 bg-green-50" : ""}>
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{agent.usage}</TableCell>
                  <TableCell className="text-right tabular-nums">{agent.latency}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2 text-green-600 font-medium">
                      {agent.success}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function KPICard({ title, value, icon, trend, trendType }: { title: string, value: string, icon: React.ReactNode, trend: string, trendType: 'up' | 'down' | 'neutral' }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-slate-100 rounded-lg">{icon}</div>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold">{value}</div>
            <div className={`flex items-center text-xs mt-1 ${
              trendType === 'up' ? 'text-green-600' : trendType === 'down' ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {trendType === 'up' && <ArrowUpRight className="w-3 h-3 mr-1" />}
              {trendType === 'down' && <ArrowDownRight className="w-3 h-3 mr-1" />}
              {trend}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}