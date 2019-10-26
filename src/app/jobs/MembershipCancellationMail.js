import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Mail from '../../lib/Mail';

class MembershipCancellationMail {
  get key() {
    return 'MembershipCancellationMail';
  }

  async handle({ data }) {
    const { findMembershipById } = data;
    findMembershipById.start_date = parseISO(findMembershipById.start_date);
    findMembershipById.end_date = parseISO(findMembershipById.end_date);

    await Mail.sendMail({
      to: `${findMembershipById.student.name} <${findMembershipById.student.email}>`,
      subject: 'Subscripção cancelada',
      template: 'membershipTemplates/membershipCancelled',
      context: {
        student_name: findMembershipById.student.name,
        plan_title: findMembershipById.plan.title,
        plan_symbol: findMembershipById.plan.symbol,
        plan_duration: findMembershipById.plan.duration,
        plan_price: findMembershipById.plan.price,
        membership_start_date: format(
          findMembershipById.start_date,
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        membership_end_date: format(
          findMembershipById.end_date,
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        membership_price: findMembershipById.price,
      },
    });
  }
}

export default new MembershipCancellationMail();
