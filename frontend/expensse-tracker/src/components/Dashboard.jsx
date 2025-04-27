import React, { useContext } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Box, Typography, Alert, CircularProgress } from "@mui/material";
import { ExpenseContext } from "../context/ExpenseContext";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Dashboard = () => {
  const { expenses, loading, error } = useContext(ExpenseContext);

  // Pie Chart Data (Category Distribution)
  const categoryData = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Bar Chart Data (Monthly Expenses)
  const monthlyData = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + exp.amount;
    return acc;
  }, {});
  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthlyData),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Spending Overview
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "45%" }, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Category Distribution
          </Typography>
          <Pie data={pieData} />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "45%" }, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Monthly Expenses
          </Typography>
          <Bar data={barData} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
