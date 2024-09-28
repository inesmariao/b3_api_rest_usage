import { useEffect, useState } from "react";

export const CatGalleryFetch = () => {

  // Estado para almacenar las imágenes de gatitos, lo inicializamos con un array vacío
  const [cats, setCats] = useState([]);
  
  // Estado para manejar posibles errores
  const [error, setError] = useState(null);

  // Estado para llevar la cuenta de cuántos gatos se han cargado
  const [page, setPage] = useState(1);

  // Método para realizar la petición a la API con fetch
  const fetchData = async (loadMore = false) => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&order=DESC`);

      // Convertimos la respuesta a formato JSON
      const data = await response.json();

      if (loadMore) {
        // Si estamos cargando más gatos, añadimos los nuevos al array existente
        setCats(prevCats => [...prevCats, ...data]);
      } else {
        // Si no, reemplazamos los gatos completamente
        setCats(data);
      }

    } catch (error) {
      console.log('Error al realizar la solicitud', error);
      setError('Error al realizar la solicitud');
    }
  };

  // useEffect ejecuta el método fetchData la primera vez que se monta el componente
  useEffect(() => {
    fetchData();
  }, []);

  // Método para cargar más gatos
  const loadMoreCats = () => {
    setPage(prevPage => prevPage + 1);
    fetchData(true);  // Indicamos que estamos cargando más gatos
  };

  // Si hay error, mostramos el mensaje de error
  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center text-white mb-4'>Galería de Gatitos con Fetch</h2>
      {/* Agregamos un contenedor scroll y altura fija */}
      <div className='row overflow-auto vh-80 scrollable-container'>
        {cats.map((cat, index) => (
          <div className='col-md-4 mb-4' key={index}>
            <div className='card h-100 d-flex flex-column'>
              {/* Aseguramos que la imagen tenga un tamaño uniforme */}
              <img src={cat.url} className='fixed-img' alt="Cat" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Botón para cargar más gatos */}
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={loadMoreCats}>
          Cargar más gatos
        </button>
      </div>
    </div>
  );
}
