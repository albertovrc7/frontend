import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CoupleArea() {
  const { name } = useParams();
  const [photos, setPhotos] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

useEffect(() => {
  const logged = localStorage.getItem("loggedCouple");

  if (!logged || logged !== name) {
    navigate("/login");
  }
}, [name]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/weddings/${name}`)
      .then((res) => {
        setPhotos(res.data.photos || []);
        setFavorites(res.data.favorites || []);
      })
      .catch((err) => {
        console.error("Error cargando galería:", err);
      });
  }, [name]);

  const toggleFavorite = (photo) => {
    let updatedFavorites;

    if (favorites.includes(photo)) {
      updatedFavorites = favorites.filter((f) => f !== photo);
    } else {
      updatedFavorites = [...favorites, photo];
    }

    setFavorites(updatedFavorites);

    axios.put(
      `${import.meta.env.VITE_API_URL}/api/weddings/${name}/favorites`,
      { favorites: updatedFavorites }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Galería privada de {name}
      </h1>

      <p className="text-center mb-8 text-gray-500">
        ❤️ Favoritas seleccionadas: {favorites.length}
      </p>

      {photos.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay fotos disponibles.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => {
            const isFavorite = favorites.includes(photo);

            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${photo}`}
                  alt="Wedding"
                  className="w-full h-64 object-cover"
                />

                <button
                  onClick={() => toggleFavorite(photo)}
                  className={`absolute top-3 right-3 text-2xl ${
                    isFavorite ? "text-red-500" : "text-white"
                  }`}
                >
                  {isFavorite ? "❤️" : "🤍"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}