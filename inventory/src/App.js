import React, { useState, useEffect, useRef } from 'react';
import InventoryList from './components/InventoryList';
import './App.css';

function App() {
  const [inventory, setInventory] = useState(() => {
    const storedInventory = localStorage.getItem('inventory');
    return storedInventory ? JSON.parse(storedInventory) : [
      { id: 1, name: 'Apple', amount: 2, spent: '$2', expiryDate: '15 Apr 2024', status: 'Not Expired' },
      // Add other initial items here
    ];
  });
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showScanReceiptPopup, setShowScanReceiptPopup] = useState(false);
  const [showScanProducePopup, setShowScanProducePopup] = useState(false);
  const [showScanPackagePopup, setShowScanPackagePopup] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    amount: 0,
    spent: '',
    expiryDate: '',
    status: ''
  });
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);
  const [imgSrc, setImgSrc] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [msg1, setMsg1] = useState('');
  const [file1, setFile1] = useState(null);
  const [imgSrc1, setImgSrc1] = useState('');
  const [extractedText1, setExtractedText1] = useState('');
  const webcamRef = useRef(null);

  // Define handleEditItem function
  const handleEditItem = (id, updatedItem) => {
    // Find the item in the inventory array and update it
    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        return updatedItem;
      }
      return item;
    });
    setInventory(updatedInventory);
  };

  // Define handleDeleteItem function
  const handleDeleteItem = (id) => {
    // Filter out the item with the specified id from the inventory array
    const updatedInventory = inventory.filter(item => item.id !== id);
    setInventory(updatedInventory);
  };

  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
    console.log("Inventory saved to local storage:", inventory);
  }, [inventory]);

  const togglePopup = (popupType) => {
    switch (popupType) {
      case 'add':
        setShowAddPopup(!showAddPopup);
        break;
      case 'receipt':
        setShowScanReceiptPopup(!showScanReceiptPopup);
        break;
      case 'produce':
        setShowScanProducePopup(!showScanProducePopup);
        break;
      case 'package':
        setShowScanPackagePopup(!showScanPackagePopup);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    const newInventoryItem = { id: inventory.length + 1, ...newItem };
    setInventory([...inventory, newInventoryItem]);
    setNewItem({
      name: '',
      amount: 0,
      spent: '',
      expiryDate: '',
      status: ''
    });
    setShowAddPopup(false);
  };

  const populateItems = (name, amount, spent, expiryDate, status) => {
    const newInventoryItem = {
      id: inventory.length + 1,
      name: name,
      amount: amount,
      spent: spent,
      expiryDate: expiryDate,
      status: status
    };
    setInventory([...inventory, newInventoryItem]);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setImgSrc(data.imgSrc);
      setExtractedText(data.extracted_text);
      setMsg('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMsg('Failed to upload image');
    }
  };

  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleUpload2 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file1', file1);
    setShowScanReceiptPopup(false); // Close the popup
    try {
      const response = await fetch('/pred', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setImgSrc1(data.imgSrc1);
      setExtractedText1(data.extracted_text1);
      setMsg1('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMsg1('Failed to upload image');
    }
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button onClick={() => console.log("Check your Savings clicked")}>Check your Savings</button>
        <button onClick={() => console.log("Recipes clicked")}>Recipes</button>
        <button onClick={() => console.log("Information clicked")}>Information</button>
        <button onClick={() => console.log("Recycling Agencies Clicked")}>Recycling Agencies</button>
        <button onClick={() => console.log("Check My Knowledge Clicked")}>Check My Knowledge</button>
      </div>
      <header>Your Fridge</header>
      <InventoryList
        inventory={inventory}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
      <div className="actions">
        <button className="add-button" onClick={() => togglePopup('add')}>Add Manually</button>
        <div className="scan-buttons">
          <button onClick={() => togglePopup('receipt')}>Scan Receipt</button>
          <button onClick={() => togglePopup('package')}>Scan Package</button>
          <button onClick={() => togglePopup('produce')}>Scan Fresh Produce</button>
        </div>
        <div>
          {msg && <h1></h1>}
          <form onSubmit={handleUpload} encType="multipart/form-data">
            <p>
              {/* Remove this input */}
              {/* <input type="file" name="file" onChange={handleFileChange} /> */}
            </p>
          </form>
          {imgSrc && <img src={imgSrc} alt="Uploaded" />}
          {extractedText ? (
            <p>
              <b>{extractedText}</b>
            </p>
          ) : (
            <p></p>
          )}
        </div>
        <div>
          {/* Remove this form */}
          {/* <form onSubmit={handleUpload2} encType="multipart/form-data">
            <p>
              <input type="file" name="file1" onChange={handleFileChange1} />
              <input type="submit" value="Upload" />
            </p>
          </form> */}
          {imgSrc1 && <img src={imgSrc1} alt="Uploaded" />}
          {extractedText1 ? (
            <p>
              <b>{extractedText1}</b>
            </p>
          ) : (
            <p></p>
          )}
        </div>
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
              <button onClick={() => togglePopup('add')}>Cancel</button>
            </div>
          </div>
        )}

        {/* Scan Receipt Popup */}
        {showScanReceiptPopup && (
          <div className="popup">
            <h2>Scan Receipt</h2>
            <div className="scan-options">
              <form onSubmit={handleUpload2} encType="multipart/form-data">
                <input type="file" name="file1" onChange={handleFileChange1} />
              </form>
              {imgSrc1 && <img src={imgSrc1} alt="Uploaded" />}
              {extractedText1 ? (
                <p>
                  <b>{extractedText1}</b>
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <button onClick={() => togglePopup('receipt')}>Cancel</button>
            <button onClick={() => populateItems('Banana', '1', '2$', '10 April 2024', 'Not Expired')}>Upload</button>
          </div>
        )}

        {/* Scan Package Popup */}
        {showScanPackagePopup && (
          <div className="popup">
            <h2>Scan Package</h2>
            <div className="scan-options">
              <form onSubmit={handleUpload2} encType="multipart/form-data">
                <input type="file" name="file1" onChange={handleFileChange1} />
              </form>
              {imgSrc1 && <img src={imgSrc1} alt="Uploaded" />}
              {extractedText1 ? (
                <p>
                  <b>{extractedText1}</b>
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <button onClick={() => togglePopup('package')}>Cancel</button>
            <button onClick={handleUpload2}>Upload</button>
          </div>
        )}

        {/* Scan Fresh Produce Popup */}
        {showScanProducePopup && (
          <div className="popup">
            <h2>Scan Produce</h2>
            <div className="scan-options">
              <form onSubmit={handleUpload2} encType="multipart/form-data">
                <input type="file" name="file1" onChange={handleFileChange1} />
              </form>
              {imgSrc1 && <img src={imgSrc1} alt="Uploaded" />}
              {extractedText1 ? (
                <p>
                  <b>{extractedText1}</b>
                </p>
              ) : (
                <p></p>
              )}
            </div>
            <button onClick={() => togglePopup('produce')}>Cancel</button>
            <button onClick={handleUpload2}>Upload</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
