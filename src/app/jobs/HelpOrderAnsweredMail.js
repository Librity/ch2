import Mail from '../../lib/Mail';

class HelpOrderAnsweredMail {
  get key() {
    return 'HelpOrderAnsweredMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: 'Pedido de auxílio respondido',
      template: 'answerTemplates/helpOrderAnswered',
      context: {
        student_name: helpOrder.student.name,
        help_order_question: helpOrder.question,
        help_order_answer: helpOrder.answer,
      },
    });
  }
}

export default new HelpOrderAnsweredMail();
