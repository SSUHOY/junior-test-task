import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../../../styles/ads-card.module.scss';
import useFavorite from '../../hooks/useFav';

const AdsCard = ({ city, title, price, images, item, id, handleAdvClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { isFavoriteItem, handleToggleFavoriteItem } = useFavorite();

  const isAdvFavorite = isFavoriteItem(id);

  const handleAdDetailsClick = () => {
    handleAdvClick(item.id);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageCarousel}>
        <button
          type="submit"
          className={styles.carouselButton}
          onClick={handleNextImage}
        >
          &lt;
        </button>
        <img
          src={item.images[currentImageIndex].thumbnail}
          alt="Ad"
          className={styles.image}
        />
        <button
          type="submit"
          className={styles.carouselButton}
          onClick={handlePrevImage}
        >
          &gt;
        </button>
      </div>

      <div
        className={styles.content}
        onClick={handleAdDetailsClick}
        onKeyDown={(e) => {
          if (e.key === 'i') {
            handleAdDetailsClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className={styles.contentRow}>
          <Link href={`../../ads/${id}/`} key={item.id}>
            <div className={styles.title}>{title}</div>
          </Link>

          <button
            type="submit"
            className={styles.likeButton}
            onClick={() => {
              handleToggleFavoriteItem(id);
            }}
          >
            {isAdvFavorite ? '❤️' : '♡'}
          </button>
        </div>

        <div className={styles.location}>
          <span>{city}</span>
          <span className={styles.price}>{price} ฿</span>
        </div>
      </div>
    </div>
  );
};

export default AdsCard;
