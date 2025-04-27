import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { ExpenseProvider } from "./context/ExpenseContext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <ExpenseProvider>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Expense Tracker
          </Typography>
          <ExpenseForm />
          <Dashboard />
          <ExpenseList />
        </Box>
      </Container>
    </ExpenseProvider>
  );
}

export default App;
