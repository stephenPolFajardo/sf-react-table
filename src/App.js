import React from 'react';
import ReactTable from './components/sf-react-table';

const data = [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' },
    { id: 3, name: 'Mike', email: 'mike@example.com' },
  ];

const App = () => {
    const columns = ['Name', 'Age', 'Email'];
    const data = [
        { Name: 'John Doe', Age: 25, Email: 'johndoe@example.com' },
        { Name: 'Jane Smith', Age: 30, Email: 'janesmith@example.com' },
        { Name: 'Bob Johnson', Age: 40, Email: 'bobjohnson@example.com' },
    ];
  return (
    <div>
        <ReactTable data={data} columns={columns} />
    </div>
  );
};

export default App;
