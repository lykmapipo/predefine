module.exports = [
  {
    namespace: 'Currency',
    strings: {
      name: { en: 'US Dollar' },
      abbreviation: { en: 'USD' },
      code: 'USD',
      symbol: '$',
    },
  },
  {
    namespace: 'Unit',
    strings: {
      name: { en: 'Kilogram' },
      abbreviation: { en: 'Kg' },
      code: 'Kg',
    },
  },
  {
    namespace: 'Unit',
    strings: {
      name: { en: 'Gram' },
      abbreviation: { en: 'g' },
      code: 'g',
    },
    booleans: { default: true },
  },
  {
    namespace: 'Item',
    strings: {
      name: { en: 'Soap' },
      abbreviation: { en: 'SP' },
      code: 'SP',
    },
  },
  {
    namespace: 'Area',
    strings: {
      name: { en: 'Serengeti Park' },
      abbreviation: { en: 'SP' },
      code: 'SP',
    },
    geos: {
      point: {
        coordinates: [30, 10],
      },
    },
  },
  {
    namespace: 'Area',
    strings: {
      name: { en: 'Ngorongoro Park' },
      abbreviation: { en: 'NP' },
      code: 'NP',
    },
    geos: {
      polygon: {
        coordinates: [
          [
            [30, 10],
            [40, 40],
            [20, 40],
            [10, 20],
            [30, 10],
          ],
        ],
      },
    },
  },
];
