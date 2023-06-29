import React, { useEffect, useState } from 'react';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <img src="srclogo.jpg" alt=""/>
        <a href="/" className="navbar-logo">
          Sample Logo
        </a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="#pictures" className="navbar-link">
              Pictures
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(response => response.json())
      .then(data => setPhotos(data.slice(0, 32))); // Limiting the photos to 32
  }, []);

  const handleInputChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPhoto = {
      id: photos.length + 1,
      title: 'New Photo',
      thumbnailUrl: imageUrl,
    };

    setPhotos([...photos, newPhoto]);
    setImageUrl('');
  };

  return (
    <section id="pictures" className="photos">
      <div className="container">
        <h2 className="section-heading">Pictures</h2>

        <form className="photo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={handleInputChange}
          />
          <button type="submit">Add Picture</button>
        </form>
          <br/>
          <br/>

        

        <div className="photo-grid">
          {photos.map(photo => (
            <div key={photo.id} className="photo-item">
              <img src={photo.thumbnailUrl} alt={photo.title} className="photo-image" />
              <p className="photo-title">{photo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">© 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Photos />
      <Footer />
    </div>
  );
};

export default App;
