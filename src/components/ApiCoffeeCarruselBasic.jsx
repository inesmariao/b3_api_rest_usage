import axios from 'axios'; // Importamos axios para hacer solicitudes HTTP
import { useEffect, useState } from 'react'; // Importamos los hooks useEffect y useState de React

// Definimos el componente ApiCoffeeCarruselBasic
export const ApiCoffeeCarruselBasic = () => {

  // Definimos el estado coffeeList que almacenará los datos de la API
  const [coffeeList, setCoffeeList] = useState([]);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {

    // Definimos una función asíncrona para obtener los datos de la API
    const fetchData = async () => {
      try {
        // Hacemos una solicitud GET a la API de cafés
        const response = await axios.get('https://api.sampleapis.com/coffee/hot');
        // Guardamos los datos obtenidos en el estado coffeeList
        setCoffeeList(response.data);

      } catch (error) {
        // Si ocurre un error, lo mostramos en la consola
        console.log('Error al recuperar los datos de la API', error);
      }
    };

    // Llamamos a la función fetchData para que se ejecute
    fetchData();

  }, []); // El array vacío significa que useEffect se ejecuta solo una vez cuando el componente se monta

  console.log(coffeeList); // Mostramos en consola la lista de cafés para depuración

  // Retornamos el JSX que representa el carrusel
  return (
    <div className="container-fluid p-0">
      <div className="text-center mb-4">
        <h1 className="text-white">Coffee List</h1> {/* Título del carrusel centrado */}
      </div>
      <div className="carousel-container">
        <div id="coffeeCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Mapeamos coffeeList para generar un item del carrusel por cada café */}
            {coffeeList.map((coffee, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                {/* Mostramos la imagen del café */}
                <img src={coffee.image} className="d-block w-100" alt={coffee.title} />
                <div className="carousel-caption d-none d-md-block">
                  {/* Mostramos el título y la descripción del café */}
                  <h5>{coffee.title}</h5>
                  <p>{coffee.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Botón para navegar al ítem anterior del carrusel */}
          <button className="carousel-control-prev" type="button" data-bs-target="#coffeeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          {/* Botón para navegar al siguiente ítem del carrusel */}
          <button className="carousel-control-next" type="button" data-bs-target="#coffeeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};
