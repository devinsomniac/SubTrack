"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  New: {
    label: "New",
    color: "#2563eb",
  },
  Archieve: {
    label: "Archieve",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function ChartSales() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/fetchMonthlySubscription");
        const data = await response.json();
        console.log("Fetched Data:", data); 
        setChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  console.log(chartData);
  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={true} />
        <XAxis
          dataKey="month"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.trim().slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="New" fill="Green" radius={4} />
        <Bar dataKey="Archieve" fill="red" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
