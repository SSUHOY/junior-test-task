'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Dialog, Button, Grid, Container } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import styles from './styles/ads.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import AdsCard from './components/ads/card/ads-card';

const Index = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorRes, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/api/ads');
        setAds(response.data.results);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          toast.error('Server error. Please try again later.');
          const retry = window.confirm(
            'An error occurred. Retry fetching ads?'
          );
          if (retry) {
            fetchAds();
          }
        } else {
          setError('Error fetching ads. Please try again later.');
        }
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <Box alignContent="center">
        <Grid container justifyContent="center" maxWidth={1170} rowGap={2.5}>
          {!loading && ads.length === 0 ? <p>{errorRes}</p> : null}
          {!loading && ads?.length
            ? ads.map((item) => (
                <AdsCard
                  id={item.id}
                  key={item.id}
                  item={item}
                  city={item.city_name}
                  images={item.images}
                  title={item.title}
                  desc={item.description}
                  price={item.price}
                />
              ))
            : null}
        </Grid>
      </Box>
    </div>
  );
};

export default Index;
