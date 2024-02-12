import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import styles from '../../../styles/ads-card.module.scss';

const AdsCard = ({ city, title, price, images, item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setIsLiked] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleLikeButton = () => {
    if (liked) {
      setIsLiked(false);
    } else {
      setIsLiked(true);
    }
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

      <div className={styles.content}>
        <div className={styles.contentRow}>
          <div className={styles.title}>{title}</div>
          <button
            type="submit"
            className={styles.likeButton}
            onClick={handleLikeButton}
          >
            {liked ? '❤️' : '♡'}
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
