<<<<<<< HEAD
// Updated App.js

import React, { useState } from 'react';
import Webcam from 'react-webcam';
import InventoryList from './components/InventoryList';
import './App.css';
import { Typography, Button } from '@material-ui/core';
import homepageImage from './images/homepage.png';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


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

  // Add delete function to handle item removal
  const handleDeleteItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

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
    ///<div className="App" style={{ backgroundImage: `url(${homepageImage})` }}>
    <div className="App">
    {/* <div className="App"> */}
      {/* Navigation bar*/}
      <nav className="navigation">
        <Button color="primary" onClick={() => console.log("Information clicked")}>Information</Button>
        <Button color="primary" onClick={() => console.log("Check your Savings clicked")}>Check your Savings</Button>
        <Button color="primary" onClick={() => console.log("Recipes clicked")}>Recipes</Button>
        {/* Navigation links */}
      </nav>
      


      {/* Banner image */}
      <div className="homepage-banner" style={{ backgroundImage: `url(${homepageImage})` }}>
      </div>


      <header>Your Fridge</header>

      {/* Encouraging message for users */}
      <Typography variant="h6" color="textSecondary" gutterBottom>
      Minimize Waste
      </Typography>
      <InventoryList inventory={inventory} onDelete={handleDeleteItem} />

      <div className="actions">
        <button onClick={toggleAddPopup}>Add</button>
        <button onClick={toggleScanPopup}>Scan</button>

        {/* Add Popup */}
        <Dialog open={showAddPopup} onClose={toggleAddPopup} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add New Item</DialogTitle>
          <DialogContent>
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
          </DialogContent>
          <DialogActions>
            <button onClick={handleAddItem}>Save</button>
            <button onClick={toggleAddPopup}>Cancel</button>
          </DialogActions>
        </Dialog>
        

        {/* Scan Item Dialog */}
        <Dialog open={showScanPopup} onClose={toggleScanPopup} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Scan Item</DialogTitle>
          <DialogContent>
            {/* Camera component */}
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          </DialogContent>
          <DialogActions>
            <button onClick={handleScanItem}>Save</button>
            <button onClick={toggleScanPopup}>Cancel</button>
          </DialogActions>
        </Dialog>

        {/* ... other components and JSX */}
=======
// App.js
import React, { useState } from 'react';
import InventoryList from './components/InventoryList';
import './App.css';

function App() {
  // Sample data for inventory items
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Apple', amount: 2, spent: '$2', expiryDate: '15 Apr 2024', status: 'Not Expired' },
    // ...other items
  ]);

  // Function to add new item
  const addItem = () => {
    // Define logic to add new item
  };

  // Function to handle scan
  const scanItem = () => {
    // Define logic to scan item
  };

  return (
    <div className="App">
      <header>Your Fridge</header>
      <InventoryList inventory={inventory} />
      <div className="actions">
        <button onClick={scanItem}>Scan</button>
        <button onClick={addItem}>Add</button>
        {/* Other components like buttons for import/export here */}
>>>>>>> 24ce2c4 (inventory folder)
      </div>
    </div>
  );
}

export default App;
<<<<<<< HEAD




=======
>>>>>>> 24ce2c4 (inventory folder)
