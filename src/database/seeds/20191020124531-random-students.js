module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Joe Gym',
          email: 'test1@test.com',
          age: 42,
          weight_metric: 80,
          height_metric: 1.9,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Jane Gym',
          email: 'test2@test.com',
          age: 30,
          weight_metric: 120,
          height_metric: 1.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Chad',
          email: 'arnold@test.com',
          age: 22,
          weight_imperial: 200,
          height_imperial: 6.1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Christina',
          email: 'test4@test.com',
          age: 25,
          weight_imperial: 80,
          height_imperial: 5.2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
