'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchAds = async ({
  minPrice,
  maxPrice,
  city,
  district,
  search,
}) => {
  let url = '/api/ads?';
  if (minPrice) url += `minPrice=${minPrice}&`;
  if (maxPrice) url += `maxPrice=${maxPrice}&`;
  if (city) url += `city=${encodeURIComponent(city)}&`;
  if (district) url += `district_name=${encodeURIComponent(district)}&`;
  if (search) url += `search=${encodeURIComponent(search)}&`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function useAdsList() {
  const [filters, setFilters] = useState({});

  const { data, error, isLoading } = useQuery({
    queryKey: ['AdsList', filters],
    queryFn: () => fetchAds(filters),
  });

  const applyFilters = (newFilters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return { data, error, isLoading, applyFilters };
}

export default useAdsList;