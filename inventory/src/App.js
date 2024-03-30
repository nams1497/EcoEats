import React, { useState } from 'react';
import Webcam from 'react-webcam';
import InventoryList from './components/InventoryList';
import './App.css';

function App() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Apple', amount: 2, spent: '$2', expiryDate: '15 Apr 2024', status: 'Not Expired' },
    // Add other initial items here
  ]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showScanPopup, setShowScanPopup] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    amount: 0,
    spent: '',
    expiryDate: '',
    status: ''
  });

  const webcamRef = React.useRef(null);

  const toggleAddPopup = () => {
    setShowAddPopup(!showAddPopup);
  };

  const toggleScanPopup = () => {
    setShowScanPopup(!showScanPopup);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    setInventory([...inventory, { id: inventory.length + 1, ...newItem }]);
    setNewItem({
      name: '',
      amount: 0,
      spent: '',
      expiryDate: '',
      status: ''
    });
    setShowAddPopup(false);
  };

  const handleScanItem = () => {
    // Define logic for scanning item
    // For simplicity, let's just toggle the scan popup for now
    setShowScanPopup(!showScanPopup);
  };

  return (
    <div className="App">
      <header>Your Fridge</header>
      <InventoryList inventory={inventory} />
      <div className="actions">
        <button onClick={toggleAddPopup}>Add</button>
        <button onClick={handleScanItem}>Scan</button>

        {/* Add Popup */}
        {showAddPopup && (
          <div className="popup">
            <h2>Add New Item</h2>
            <label>Name:</label>
            <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
            <label>Amount:</label>
            <input type="number" name="amount" value={newItem.amount} onChange={handleInputChange} />
            <label>Spent:</label>
            <input type="text" name="spent" value={newItem.spent} onChange={handleInputChange} />
            <label>Expiry Date:</label>
            <input type="text" name="expiryDate" value={newItem.expiryDate} onChange={handleInputChange} />
            <label>Status:</label>
            <input type="text" name="status" value={newItem.status} onChange={handleInputChange} />
            <button onClick={handleAddItem}>Save</button>
            <button onClick={toggleAddPopup}>Cancel</button>
          </div>
        )}

        {/* Scan Popup */}
        {showScanPopup && (
          <div className="popup">
            <h2>Scan Item</h2>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
            />
            <button onClick={toggleScanPopup}>Save</button>
            <button onClick={toggleScanPopup}>Cancel</button>
          </div>
        )}

        {/* Other components like buttons for import/export here */}
      </div>
    </div>
  );
}

export default App;
