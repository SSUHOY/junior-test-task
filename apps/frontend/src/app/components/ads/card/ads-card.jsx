import React, { useState } from 'react';
import { Grid } from '@mui/material';
import styles from '../../../styles/ads-card.module.scss';

const AdsCard = ({ city, title, price, images, desc, item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, isLiked] = useState();

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Grid item xs={12} sm={6} md={4} className={styles.card}>
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
          <button type="submit" className={styles.likeButton}>
            {liked ? '❤️' : '♡'}
          </button>
        </div>

        <div className={styles.location}>
          <span>{city}</span>
          <span className={styles.price}>{price} ฿</span>
        </div>
      </div>
    </Grid>
  );
};

export default AdsCard;
