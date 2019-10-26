module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'memberships',
      [
        {
          student_id: 1,
          plan_id: 1,
          start_date: new Date(),
          end_date: new Date(),
          price: 129.99,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          plan_id: 3,
          start_date: new Date(),
          end_date: new Date(),
          price: 540.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          plan_id: 2,
          start_date: new Date(),
          end_date: new Date(),
          price: 330.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          plan_id: 3,
          start_date: new Date(),
          end_date: new Date(),
          price: 540.0,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
