import React from 'react';
import PropTypes from 'prop-types';


const ReactTable = ({ data, columns }) => {
    return (
        <table style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <thead>
          <tr style={{ display: 'flex', justifyContent: 'space-between' }}>
            {columns.map((column) => (
              <th style={{ padding: 8 }} key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
              {columns.map((column) => (
                <td style={{ padding: 8 }} key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )

}


ReactTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
}


export default ReactTable;