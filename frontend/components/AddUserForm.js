import React, { useState, useEffect } from 'react';
import styles from '../styles/AddUserForm.module.css';

const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [showImageSelector, setShowImageSelector] = useState(false);

  // Array of profile images
  const profileImages = [
    'https://i.pinimg.com/736x/e9/55/a6/e955a61441385e52e3db78fd8cbe4453.jpg',
    'https://i.pinimg.com/736x/e8/c6/78/e8c6781d0a03959f0125474200649529.jpg',
    'https://i.pinimg.com/736x/95/96/1b/95961b3c05c7baec1504be3370dda6d8.jpg',
    'https://i.pinimg.com/736x/43/a1/12/43a11200a7d0f73cbab231ec4262886c.jpg',
    'https://i.pinimg.com/736x/62/0c/5b/620c5b2cd89fe0564a4ec158e45ef7e8.jpg',
    'https://i.pinimg.com/736x/0b/81/93/0b8193ef3e50534e2195d22db0d0ee0d.jpg'
  ];

  // Select a random profile image when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    setSelectedImage(profileImages[randomIndex]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    // Pass both name and selected image to parent component
    onAddUser(name, selectedImage);
    setName('');
    setError('');
    // Select a new random image for the next user
    const randomIndex = Math.floor(Math.random() * profileImages.length);
    setSelectedImage(profileImages[randomIndex]);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imagePreview}>
        <img 
          src={selectedImage} 
          alt="Profile preview" 
          className={styles.previewImage} 
          onClick={() => setShowImageSelector(!showImageSelector)}
        />
        <button 
          type="button" 
          className={styles.refreshButton}
          onClick={() => setShowImageSelector(!showImageSelector)}
          title="Select profile image"
        >
          🔄
        </button>
      </div>
      
      {showImageSelector && (
        <div className={styles.imageSelector}>
          <h4>Select Profile Image</h4>
          <div className={styles.imageGrid}>
            {profileImages.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Profile option ${index + 1}`}
                className={`${styles.imageOption} ${selectedImage === image ? styles.selectedImage : ''}`}
                onClick={() => {
                  setSelectedImage(image);
                  setShowImageSelector(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      <div className={styles.formGroup}>
        <label htmlFor="name">User Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          placeholder="Enter user name"
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className={styles.button}>Add User</button>
    </form>
  );
};

export default AddUserForm;