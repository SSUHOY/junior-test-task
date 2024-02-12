import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import AdDetails from '../ads/adsDetails/adv-details';

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
      theme: 'white',
    });
  }
  return null;
}

const AdvDetails = ({ params }) => {
  const [ad, setAd] = useState({});

  useEffect(() => {
    const getAd = async () => {
      const fetchData = await fetchAdById(params.id);

      setAd(fetchData);
    };

    getAd();
  });

  return (
    <div>
      <AdDetails ad={ad} />
      <ToastContainer />
    </div>
  );
};

export default AdvDetails;
