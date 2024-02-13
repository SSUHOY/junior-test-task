'use client';

import { useEffect, useState } from 'react';

function useFavorite() {
  const [favorites, setFavorites] = useState<number[]>([]);

  JSON.parse(localStorage.getItem('favorites') || '[]');

  const isFavoriteItem = (id: number) => favorites.includes(id);

  const handleToggleFavoriteItem = (id: number) => {
    setFavorites((prevFavorites: number[]) => {
      const isFavorite = isFavoriteItem(id);

      if (!isFavorite) {
        const newStorageItem = [...prevFavorites, id];
        localStorage.setItem('favorites', JSON.stringify(newStorageItem));
        return newStorageItem;
      }

      const newStorageItem = prevFavorites.filter((savedId) => savedId !== id);
      localStorage.setItem('favorites', JSON.stringify(newStorageItem));
      return newStorageItem;
    });
  };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favorites') || '[]'));
  }, []);

  return { handleToggleFavoriteItem, isFavoriteItem };
}

export default useFavorite;
