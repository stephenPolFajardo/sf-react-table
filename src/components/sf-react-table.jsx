import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './tableStyle.css';
import MagnifyingIcon from '../svg/magnifying';
import Modal from '../core/sf-core-modal';

const ReactTable = ({ data, columns, defaultSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilteredData] = useState(data);
  const [selectAll, setSelectedAll] = useState(false);
  const [checkedRow, setCheckedRow] = useState([]);
  const [selectOption, setSelectedOption] = useState(defaultSearch);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRowClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleSearch = (text) => {
    setSearchText(text.target.value);
    const filtered = data.filter((item) => {
      if (typeof text.target.value === 'string' && typeof item[selectOption] === 'string') {
        return item[selectOption].toLowerCase().includes(text.target.value.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFilterData = () => {
    const filtered = data.filter((item) => {
      if (typeof searchText === 'string' && typeof item[selectOption] === 'string') {
        return item[selectOption].toLowerCase().includes(searchText.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  };

  const handleCheckBoxToggle = (rowId) => {
    if (selectAll) {
      setCheckedRow(checkedRow.filter((id) => id !== rowId));
      setSelectedAll(false);
    }

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
    setSelectedAll(!selectAll);
  };

  return (
    <div>
      <div style={{ margin: 10, position: 'relative', display: 'flex', gap: 10 }}>
        <div className="input-icon">
          <MagnifyingIcon />
        </div>
        <input
          placeholder="Search"
          onChange={handleSearch}
          value={searchText}
          type="text"
        />
        <select
          style={{ textTransform: 'capitalize' }}
          name="thead"
          id="caption"
          onChange={handleSelectChange}
          value={selectOption}
        >
          {columns.map((column, key) => (
            <option key={key} value={column}>
              {column}
            </option>
          ))}
        </select>
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
            <tr key={index} onClick={() => handleRowClick(row)}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={!!selectedItem} onClose={closeModal}>
        {selectedItem && (
          <>
            <h2>Details</h2>
            {Object.entries(selectedItem).map(([key, value]) => (
              <div key={key}>
                <strong>{key}: </strong> {value}
              </div>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
};

ReactTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReactTable;
