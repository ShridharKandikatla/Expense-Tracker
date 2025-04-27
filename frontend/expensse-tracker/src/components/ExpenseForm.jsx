import React, { useState, useContext } from "react";
import { TextField, Button, MenuItem, Box, Alert } from "@mui/material";
import { ExpenseContext } from "../context/ExpenseContext";

const categories = ["Food", "Transport", "Entertainment", "Bills", "Other"];

const ExpenseForm = () => {
  const { addExpense, error, loading } = useContext(ExpenseContext);
  const [expense, setExpense] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(expense);
    setExpense({ amount: "", category: "", description: "", date: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={expense.amount}
        onChange={handleChange}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Category"
        name="category"
        value={expense.category}
        onChange={handleChange}
        required
        fullWidth
        sx={{ mb: 2 }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Description"
        name="description"
        value={expense.description}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Date"
        name="date"
        type="date"
        value={expense.date}
        onChange={handleChange}
        required
        fullWidth
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Expense"}
      </Button>
    </Box>
  );
};

export default ExpenseForm;
