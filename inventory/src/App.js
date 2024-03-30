// Updated App.js

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
    // Capture picture from webcam
    const imageSrc = webcamRef.current.getScreenshot();
    // Handle captured image (e.g., save it)
    console.log(imageSrc);
    // Close scan popup
    setShowScanPopup(false);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={() => console.log("Information clicked")}>Information</button>
        <button onClick={() => console.log("Check your Savings clicked")}>Check your Savings</button>
        <button onClick={() => console.log("Recipes clicked")}>Recipes</button>
      </div>
      <header>Your Fridge</header>
      <InventoryList inventory={inventory} />
      <div className="actions">
        <button onClick={toggleAddPopup}>Add</button>
        <button onClick={toggleScanPopup}>Scan</button>

        {/* Add Popup */}
        {showAddPopup && (
          <div className="popup large-popup">
            <h2>Add New Item</h2>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input type="number" name="amount" value={newItem.amount} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Spent:</label>
              <input type="text" name="spent" value={newItem.spent} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Expiry Date:</label>
              <input type="text" name="expiryDate" value={newItem.expiryDate} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Status:</label>
              <input type="text" name="status" value={newItem.status} onChange={handleInputChange} />
            </div>
            <div className="form-actions">
              <button onClick={handleAddItem}>Save</button>
              <button onClick={toggleAddPopup}>Cancel</button>
            </div>
          </div>
        )}

        {/* Scan Popup */}
        {showScanPopup && (
          <div className="popup">
            <h2>Scan Item</h2>
            {/* Camera component */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            <button onClick={handleScanItem}>Save</button>
            <button onClick={toggleScanPopup}>Cancel</button>
          </div>
        )}

        {/* Other components like buttons for import/export here */}
      </div>
    </div>
  );
}

export default App;
