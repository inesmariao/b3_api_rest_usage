import axios from 'axios';
import { useEffect, useState } from 'react';

export const ApiCoffeeCarruselBasic = () => {

  const [coffeeList, setCoffeeList]= useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await axios.get('https://api.sampleapis.com/coffee/hot');
        setCoffeeList(response.data);

      } catch (error) {
        console.log('Error al recuperar los datos de la API', error);
      }
    };

    fetchData();

  }, []);

  console.log(coffeeList);

  return (
      <div className="container-fluid p-0">
      <div className="text-center mb-4">
        <h1 className="text-white">Coffee List</h1> {/* Título del carrusel centrado */}
      </div>
      <div className="carousel-container">
        <div id="coffeeCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {coffeeList.map((coffee, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <img src={coffee.image} className="d-block w-100" alt={coffee.title} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{coffee.title}</h5>
                  <p>{coffee.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#coffeeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#coffeeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

