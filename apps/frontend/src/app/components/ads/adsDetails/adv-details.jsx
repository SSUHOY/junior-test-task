'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../../styles/ads-details.module.scss';
import Skeleton from '../../loader/skeleton';

const AdDetails = ({ ad, isLoading }) => {
  const router = useRouter();

  const [curImgId, setCurImgId] = useState(0);

  const onClickNext = () => {
    if (curImgId + 1 <= ad.images.length - 1) {
      setCurImgId((prev) => prev + 1);
    } else {
      setCurImgId(0);
    }
  };
  const onClickPrev = () => {
    if (curImgId - 1 >= 0) {
      setCurImgId((prev) => prev - 1);
    } else {
      const id = ad.images.length - 1;
      setCurImgId(id);
    }
  };

  if (!ad || isLoading) {
    return <Skeleton count={1} />;
  }

  return (
    <div className={styles.root}>
      <button
        type="button"
        onClick={() => router.back()}
        className={styles.back__to_button}
      >
        Click here to go back
      </button>
      <div className={styles.root__carousel}>
        <div
          onClick={onClickPrev}
          role="button"
          tabIndex={0}
          className={styles.root__carousel_prev}
        >{`<`}</div>

        <img src={ad.images[curImgId].image} alt={`img ${ad.title}`} />
        <div
          onClick={onClickNext}
          role="button"
          tabIndex={0}
          className={styles.root__carousel_next}
        >{`>`}</div>
      </div>

      <div className={styles.root__adInfo}>
        <div>
          <div className={styles.root__adInfo_title}>{ad.title}</div>
          <div />
          <button className={styles.root__adInfo_likeBtn} type="submit">
            Like
          </button>
        </div>

        <div className={styles.root__adInfo_location}>
          <span>{ad.city_name}</span>, <span>{ad.district_name}</span>
          <div />
          <span className={styles.root__adInfo_price}>{ad.price}бат</span>
        </div>

        <div
          className={styles.root__adInfo_description}
          dangerouslySetInnerHTML={{ __html: ad.description }}
        />
      </div>
    </div>
  );
};

export default AdDetails;
