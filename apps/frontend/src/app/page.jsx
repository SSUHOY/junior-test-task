'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Container, TextField, MenuItem } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import styles from './styles/ads.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import AdsCard from './components/ads/card/ads-card';
import Skeleton from './components/loader/skeleton';
import getMockAdsData from './components/ads/filters/ads.filters';
import useAdsList from './components/hooks/useAdsList';

const Index = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorRes, setError] = useState(null);

  const { applyFilters } = useAdsList();

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
          setError('Error with fetching ads. Please try again later.');
        }
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <div>
        <h1>List of ads</h1>
      </div>
      <Box component="form" noValidate autoComplete="off">
        {getMockAdsData.filterList.map((filter) => (
          <div key={filter.id}>
            {filter.select ? (
              <TextField
                id={filter.id}
                select
                label="Select"
                helperText={filter.helperText}
                onChange={(e) => applyFilters({ [filter.key]: e.target.value })}
              >
                {filter.options?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                id={filter.id}
                type={filter.type}
                helperText={filter.helperText}
                onChange={(e) =>
                  applyFilters({
                    [filter.key]:
                      filter.type === 'number'
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}
      </Box>
      <ToastContainer />
      <Box alignContent="center">
        <Grid container maxWidth={1170} rowGap={2.5}>
          {loading && <Skeleton count={4} />}
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
    </Container>
  );
};

export default Index;
