import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './tableStyle.css';
import MagnifyingIcon from '../svg/magnifying';

const ReactTable = ({ data, columns }) => {
    const [searchText, setSearchText] = React.useState('');
    const [filterData, setFilteredData] = React.useState(data);
    const [selectAll, setSelectedAll] = React.useState(false);
    const [checkedRow, setCheckedRow] = React.useState([]);

    const handleSearch = (text) => {
      setSearchText(text.target.value);
    
      const filtered = data.filter((item) => {
        if (typeof text.target.value === 'string' && typeof item.name === 'string') {
          return item.name.toLowerCase().includes(text.target.value.toLowerCase());
        }
        return false;
      });
      setFilteredData(filtered);
    };
    

    const handleCheckBoxToggle = (rowId) => {
      if (selectAll) {
        setCheckedRow(checkedRow.filter((id) => id !== rowId));
        setSelectedAll(false);
      };

      const isChecked = checkedRow.includes(rowId);
      if (isChecked) {
        setCheckedRow(checkedRow.filter((id) => id !== rowId));
      } else {
        setCheckedRow([...checkedRow, rowId]);
      }
    };

    const handleSelectAllToggle = () => {
      if (selectAll) {
        setCheckedRow([]);
      } else {
        const allRowIds = data.map((row) => row.id);
        setCheckedRow(allRowIds);
      }
      setCheckedRows(!selectAll);
    };
     return (
        <div>
        <div style={{ margin: 10, position: 'relative' }}>
        <div className="input-icon"> 
          <MagnifyingIcon />
        </div>
        <input placeholder='Search' onChange={handleSearch} value={searchText} type='text'/>
        </div>
        <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filterData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )

}


ReactTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}


export default ReactTable;