// InventoryList.js
import React from 'react';
import InventoryItem from './InventoryItem';

function InventoryList({ inventory }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Spent</th>
          <th>Expiry Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventory.map(item => (
          <InventoryItem key={item.id} item={item} />
        ))}
      </tbody>
    </table>
  );
}

export default InventoryList;




// // InventoryList.js
// import React from 'react';
// import InventoryItem from './InventoryItem';
// // InventoryList.js

// // If you want to use a default export, it should look like this:
// export default function InventoryList({ inventory }) {
//   // ...
// }

// Then, when you import it in App.js, it should look like this:
// import InventoryList from './components/InventoryList';



// // InventoryList.js or wherever your table is defined
// function InventoryList({ inventory }) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th style={{width: '20%'}}>Name</th>
//           <th style={{width: '20%'}}>Amount</th>
//           <th style={{width: '20%'}}>Cost</th>
//           <th style={{width: '20%'}}>Expiry Date</th>
//           <th style={{width: '20%'}}>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {inventory.map(item => (
//           <InventoryItem key={item.id} item={item} />
//         ))}
//       </tbody>
//     </table>
//   );
// }




// // InventoryList.js
// import React from 'react';
// import InventoryItem from './InventoryItem';

// function InventoryList({ inventory, onDelete }) { // Note the addition of the onDelete prop here
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Amount</th>
//           <th>Spent</th>
//           <th>Expiry Date</th>
//           <th>Status</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {inventory.map(item => (
//           <InventoryItem key={item.id} item={item} onDelete={onDelete} />
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default InventoryList;


