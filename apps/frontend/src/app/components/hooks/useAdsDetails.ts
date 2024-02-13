'use client';

import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { IResponseItem } from '../../interfaces/types';

const fetchAdsDetails = async (id: number) => {
  const url = `/api/ads/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    toast.error(`${response.statusText} The network is not responding`, {
      theme: 'dark',
    });

    throw new Error(`${response.statusText} The network is not responding`);
  }
  return response.json();
};

function useAdsDetails(id: number) {
  const { data, error, isLoading } = useQuery<IResponseItem>({
    queryKey: [`AdsDetail ${id}`],
    queryFn: () => fetchAdsDetails(id),
  });
  return { data, error, isLoading, fetchAdsDetails };
}

export default useAdsDetails;
