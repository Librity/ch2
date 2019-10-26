import Sequelize, { Model } from 'sequelize';
import { addMonths } from 'date-fns';

import Plan from './Plan';

class Membership extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.NUMBER,
        plan_id: Sequelize.NUMBER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async membership => {
      const { duration, price } = await Plan.findByPk(membership.plan_id);

      membership.end_date = addMonths(membership.start_date, duration);
      membership.price = Math.round(duration * price * 1e2) / 1e2;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Membership;
