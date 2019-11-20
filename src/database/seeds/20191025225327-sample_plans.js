module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'plans',
      [
        {
          title: 'Silver',
          symbol: '🥈',
          duration: 1,
          price: 129.99,
          total_price: 129.99 * 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Gold',
          symbol: '🏆',
          duration: 3,
          price: 109.99,
          total_price: 109.99 * 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Diamond',
          symbol: '💎',
          duration: 6,
          price: 89.99,
          total_price: 89.99 * 6,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
