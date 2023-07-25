import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReactTable from './sf-react-table';

// Sample data and columns for testing
const data = [
  { id: 1, name: 'John Doe', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', age: 28, city: 'San Francisco' },
];

const columns = ['id', 'name', 'age', 'city'];

describe('ReactTable Component', () => {
  it('should render a table with the correct number of rows and columns', () => {
    render(<ReactTable data={data} columns={columns} defaultSearch="name" />);

    // Ensure the table exists
    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    // Ensure the correct number of rows is rendered (plus the header row)
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1);

    // Ensure the correct number of columns is rendered (plus the column headers)
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(columns.length);

    // Ensure the column headers are rendered correctly
    columns.forEach(async (column) => {
      const columnHeader = await screen.getByText(column);
      expect(columnHeader).toBeInTheDocument();
    });

    // Ensure the data rows are rendered correctly
    data.forEach((row) => {
      Object.values(row).forEach(async (cellValue) => {
        const cell = await screen.getByText(cellValue);
        expect(cell).toBeInTheDocument();
      });
    });
  });
});

describe('ReactTable Component', () => {
    it('should filter data correctly when using search', () => {
      render(<ReactTable data={data} columns={columns} defaultSearch="name" />);
  
      // Ensure the table exists
      const tableElement = screen.getByRole('table');
      expect(tableElement).toBeInTheDocument();
  
      // Ensure the correct number of rows is rendered (plus the header row)
      const rows = screen.getAllByRole('row');
      expect(rows).toHaveLength(data.length + 1);
  
      // Simulate user input in the search field
      const searchInput = screen.getByLabelText('Search');
      fireEvent.change(searchInput, { target: { value: 'John' } });
  
      // Ensure the table updates and displays the filtered data correctly
      const filteredRows = screen.getAllByRole('row');
      expect(filteredRows).toHaveLength(2); // Assuming one row for header and one matching row for "John Doe"
  
      // Additional assertions as needed based on your implementation
      // For example, you can check if the "Jane Smith" row is no longer visible in the table.
    });
  });