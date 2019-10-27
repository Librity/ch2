import Mail from '../../lib/Mail';

class TemplateMail {
  get key() {
    return 'TemplateMail';
  }

  async handle({ data }) {
    const { object } = data;

    await Mail.sendMail({
      to: `${object.reciever.name} <${object.reciever.email}>`,
      subject: 'Example',
      template: 'answerTemplates/helpOrderAnswered',
      context: {
        student_name: object.student.name,
      },
    });
  }
}

export default new TemplateMail();
