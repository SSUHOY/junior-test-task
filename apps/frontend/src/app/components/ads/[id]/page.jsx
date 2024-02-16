'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import AdDetails from '../adsDetails/adv-details';

async function fetchAdById(id) {
  try {
    const { data } = await axios.get(`http://localhost:8000/api/ads/${id}`);
    return data;
  } catch (err) {
    toast.error(err.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
  return null;
}

const AdvDetails = () => {
  const { id } = useParams();
  const [ad, setAds] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const getAd = async () => {
      const fetchData = await fetchAdById(id);
      setAds(fetchData);
      setLoading(false);
    };
    getAd();
  }, [id]);

  return (
    <div>
      <AdDetails ad={ad} isLoading={isLoading} />
      <ToastContainer />
    </div>
  );
};

export default AdvDetails;
