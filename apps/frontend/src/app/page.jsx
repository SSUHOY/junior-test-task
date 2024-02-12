'use client';

import React, { useState } from 'react';

import styles from './styles/ads.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import useAdsList from './components/hooks/useAdsList';
import AdsList from './components/ads/adsList/ads-list';
import AdvDetails from './components/[id]/page';

const Index = () => {
  const [selectedAdv, setSelectedAdv] = useState(null);
  const [selectedAdvId, setSelectedAdvId] = useState(null);

  const { data } = useAdsList();

  const handleAdClick = (adId) => {
    const selectedAd = data.results.find((ad) => ad.id === adId);
    setSelectedAdv(selectedAd);
    setSelectedAdvId(adId);
  };

  return (
      <AdsList onAdvClick={handleAdClick} />
  );
};

export default Index;
