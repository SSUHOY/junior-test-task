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
  const { data, error, isLoading, applyFilters } = useAdsList();

  const [likedPosts, setLikedPosts] = useState([]);

  return (
    <Container maxWidth="lg" className={styles.container}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className={styles.filters}
      >
        {getMockAdsData.filterList.map((filter) => (
          <div key={filter.id}>
            {filter.select ? (
              <TextField
                className={styles.input}
                id={filter.id}
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
                className={styles.input}
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
        <Grid container maxWidth={1370} rowGap={2.5} className={styles.list}>
          {isLoading && <Skeleton count={4} />}
          {!isLoading && data.results.length === 0 ? (
            <p>No results found</p>
          ) : null}
          {!isLoading && data.results.length
            ? data.results.map((item) => (
                <AdsCard
                  id={item.id}
                  key={item.id}
                  item={item}
                  city={item.city_name}
                  images={item.images}
                  title={item.title}
                  desc={item.description}
                  price={item.price}
                  likedPosts={likedPosts}
                  setLikedPosts={setLikedPosts}
                />
              ))
            : null}
        </Grid>
      </Box>
    </Container>
  );
};

export default Index;
