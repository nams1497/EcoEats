// components/InventoryList.js
import React from 'react';

const InventoryList = ({ inventory, onEdit, onDelete }) => {
  return (
    <div className="inventory-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Spent</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.spent}</td>
              <td>{item.expiryDate}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => onEdit(item.id, item)}>Edit</button>
              </td>
              <td>
                <button onClick={() => onDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryList;
