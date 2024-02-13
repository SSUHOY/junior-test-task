'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { IFilterResponse } from '../../interfaces/types';

const fetchAds = async (params: {
  minPrice?: null | number;
  maxPrice?: null | number;
  city?: null | string;
  district?: null | string;
  search?: null | string;
}) => {
  let url = '/api/ads?';
  const { minPrice, maxPrice, city, district, search } = params;
  if (minPrice) url += `minPrice=${minPrice}&`;
  if (maxPrice) url += `maxPrice=${maxPrice}&`;
  if (city) url += `city=${encodeURIComponent(city)}&`;
  if (district) url += `district_name=${encodeURIComponent(district)}&`;
  if (search) url += `search=${encodeURIComponent(search)}&`;

  const response = await fetch(url);
  if (!response.ok) {
    toast.error(
      `${response.statusText} Network response wasn't ok, try again later`,
      {
        theme: 'dark',
      }
    );
  }
  return response.json();
};

function useAdsList() {
  const [filters, setFilters] = useState<{
    minPrice?: number;
    maxPrice?: number;
    city?: string;
    district?: string;
    search?: string;
  }>({});

  const { data, error, isLoading } = useQuery<IFilterResponse>({
    queryKey: ['AdsList', filters],
    queryFn: () => fetchAds(filters),
  });

  const applyFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  return { data, error, isLoading, applyFilters };
}

export default useAdsList;
