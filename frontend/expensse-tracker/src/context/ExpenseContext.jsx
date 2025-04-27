import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch expenses on mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/expenses");
      setExpenses(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/expenses", expense);
      setExpenses([res.data, ...expenses]); // Add new expense to state
      setError(null);
    } catch (err) {
      setError("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (id, updatedExpense) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/expenses/${id}`,
        updatedExpense
      );
      setExpenses(expenses.map((exp) => (exp._id === id ? res.data : exp)));
      setError(null);
    } catch (err) {
      setError("Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
      setError(null);
    } catch (err) {
      setError("Failed to delete expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        error,
        addExpense,
        updateExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
