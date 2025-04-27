import React, { useState, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { ExpenseContext } from "../context/ExpenseContext";

const categories = ["Food", "Transport", "Entertainment", "Bills", "Other"];

const ExpenseList = () => {
  const { expenses, loading, error, updateExpense, deleteExpense } =
    useContext(ExpenseContext);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEdit = (expense) => {
    setEditing(expense._id);
    setEditForm({ ...expense, date: expense.date.split("T")[0] });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (id) => {
    await updateExpense(id, editForm);
    setEditing(null);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {loading && (
        <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense._id}>
              {editing === expense._id ? (
                <>
                  <TableCell>
                    <TextField
                      name="amount"
                      type="number"
                      value={editForm.amount}
                      onChange={handleEditChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      select
                      name="category"
                      value={editForm.category}
                      onChange={handleEditChange}
                    >
                      {categories.map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name="date"
                      type="date"
                      value={editForm.date}
                      onChange={handleEditChange}
                      InputLabelProps={{ shrink: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEditSubmit(expense._id)}
                      color="primary"
                      disabled={loading}
                    >
                      Save
                    </Button>
                    <Button onClick={() => setEditing(null)} color="secondary">
                      Cancel
                    </Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(expense)}
                      color="primary"
                      disabled={loading}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteExpense(expense._id)}
                      color="secondary"
                      disabled={loading}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
