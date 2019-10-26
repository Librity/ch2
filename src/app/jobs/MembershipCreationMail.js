import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class MembershipCreationMail {
  get key() {
    return 'MembershipCreationMail';
  }

  async handle({ data }) {
    const { newMembership } = data;
    newMembership.start_date = parseISO(newMembership.start_date);
    newMembership.end_date = parseISO(newMembership.end_date);

    await Mail.sendMail({
      to: `${newMembership.student.name} <${newMembership.student.email}>`,
      subject: 'Subscripção criada',
      template: 'membershipTemplates/membershipCreated',
      context: {
        student_name: newMembership.student.name,
        plan_title: newMembership.plan.title,
        plan_symbol: newMembership.plan.symbol,
        plan_duration: newMembership.plan.duration,
        plan_price: newMembership.plan.price,
        membership_start_date: format(
          newMembership.start_date,
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        membership_end_date: format(
          newMembership.end_date,
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        membership_price: newMembership.price,
      },
    });
  }
}

export default new MembershipCreationMail();
