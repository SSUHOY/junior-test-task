const city = [
  {
    value: 'Паттайя',
    label: 'Паттайя',
  },
  {
    value: 'Пхукет',
    label: 'Пхукет',
  },
  {
    value: 'Самуи',
    label: 'Самуи',
  },
  {
    value: 'Панган',
    label: 'Панган',
  },
];

const district = [
  {
    value: 'Равай',
    label: 'Равай',
  },
  {
    value: 'Натон',
    label: 'Натон',
  },
  {
    value: 'Джомтьен',
    label: 'Джомтьен',
  },
  {
    value: 'Карон',
    label: 'Карон',
  },
];

const filterList = [
  {
    id: 'outlined-minPrice',
    key: 'minPrice',
    type: 'number',
    helperText: 'Please enter min price',
  },
  {
    id: 'outlined-maxPrice',
    key: 'maxPrice',
    type: 'number',
    helperText: 'Please enter max price',
  },
  {
    id: 'outlined-select-city',
    key: 'city',
    helperText: 'Please select your city',
    select: true,
    options: city,
  },
  {
    id: 'outlined-select-district',
    key: 'district',
    helperText: 'Please select your district',
    select: true,
    options: district,
  },
  {
    id: 'outlined-search',
    key: 'search',
    type: 'text',
    helperText: 'Please enter search query',
  },
];

function getMockAdsData() {
  return {
    district,
    city,
    filterList,
  };
}

export default getMockAdsData();
