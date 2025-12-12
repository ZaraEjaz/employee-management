'use client';

import { useState, useEffect } from 'react';
import { Employee } from '@/types/employee';

const LOCAL_STORAGE_KEY = 'employee_data';

const MOCK_DATA: Employee[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Developer', status: 'Active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Lead', status: 'Active' },
  { id: '3', name: 'Alice Johnson', email: 'alice@example.com', role: 'Designer', status: 'Inactive' },
    { id: '4', name: 'Bob Brown', email: 'bob@example.com', role: 'Developer', status: 'Active' },
    { id: '5', name: 'Charlie Davis', email: 'charlie@example.com', role: 'Designer', status: 'Active' },
    { id: '6', name: 'Diana Evans', email: 'diana@example.com', role: 'Lead', status: 'Inactive' },
    { id: '7', name: 'Ethan Foster', email: 'ethan@example.com', role: 'Developer', status: 'Active' },
    { id: '8', name: 'Fiona Green', email: 'fiona@example.com', role: 'Designer', status: 'Active' },
    { id: '9', name: 'George Harris', email: 'george@example.com', role: 'Developer', status: 'Inactive' },
    { id: '10', name: 'Hannah White', email: 'hannah@example.com', role: 'Lead', status: 'Active' },
    { id: '11', name: 'Ian King', email: 'ian@example.com', role: 'Developer', status: 'Active' },
    { id: '12', name: 'Julia Scott', email: 'julia@example.com', role: 'Designer', status: 'Active' },
  
];

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from LocalStorage or use Mock Data
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setEmployees(JSON.parse(saved));
    } else {
      setEmployees(MOCK_DATA);
    }
    setLoading(false);
  }, []);

  // Save to LocalStorage whenever employees change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
    }
  }, [employees, loading]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: crypto.randomUUID() };
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updatedData: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return { employees, loading, addEmployee, updateEmployee, deleteEmployee };
};