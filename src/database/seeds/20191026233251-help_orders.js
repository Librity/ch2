module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'Should I avoid alcohol?',
          answer: null,
          answered_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          question: 'How mush should I exercise every day?',
          answer: 'You should exercise at least 30 minutes a day.',
          answered_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          question: 'How do I get thin?',
          answer: 'Diet & Exercise.',
          answered_at: new Date(),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          question: 'What benefits does the Diamond Plan give me?',
          answer: null,
          answered_at: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
