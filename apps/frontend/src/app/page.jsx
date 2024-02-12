'use client';

import React, { useState } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import useAdsList from './components/hooks/useAdsList';
import AdsList from './components/ads/adsList/ads-list';

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
      <AdsList onAdvClick={handleAdClick} selectedAd={selectedAdv} selectedAdvId={selectedAdvId} />
  );
};

export default Index;
