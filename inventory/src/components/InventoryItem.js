// InventoryItem.js
import React from 'react';

function InventoryItem({ item }) {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.amount}</td>
      <td>{item.spent}</td>
      <td>{item.expiryDate}</td>
      <td>{item.status}</td>
      <td>
        {/* Render your delete and three-dots menu icon here */}
      </td>
    </tr>
  );
}

export default InventoryItem;
<<<<<<< HEAD


// // InventoryItem.js
// import React from 'react';

// function InventoryItem({ item, onDelete }) { // Note the addition of the onDelete prop here
//   return (
//     <tr>
//       <td>{item.name}</td>
//       <td>{item.amount}</td>
//       <td>{item.spent}</td>
//       <td>{item.expiryDate}</td>
//       <td>{item.status}</td>
//       <td>
//         <span className="delete-icon" onClick={() => onDelete(item.id)}>&times;</span>
//         <span className="menu-icon">⋮</span>
//       </td>
//     </tr>
//   );
// }

// export default InventoryItem;
=======
>>>>>>> 24ce2c4 (inventory folder)
