import React from 'react';
import ReactTable from './components/sf-react-table';



const App = () => {
    const columns = ['name', 'age', 'email', 'contact'];
    const data = [
        { name: 'John Doe', age: 25, email: 'johndoe@example.com', contact: '23123123' },
        { name: 'Jane Smith', age: 30, email: 'janesmith@example.com', contact: '23123123'  },
        { name: 'Bob Johnson', age: 40, email: 'bobjohnson@example.com', contact: '23123123'  },
        { name: 'Clear ', age: 40, email: 'bobjohnson@example.com', contact: '23123123'  },
        { name: 'Stephen', age: 40, email: 'bobjohnson@example.com', contact: '23123123'  },
        { name: 'Rich', age: 40, email: 'bobjohnson@example.com', contact: '23123123'  },
    ];
  return (
    <div>
        <ReactTable data={data} columns={columns} placeholder='Search' />
    </div>
  );
};

export default App;
