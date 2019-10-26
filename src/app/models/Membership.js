import Sequelize, { Model } from 'sequelize';
import { parseISO, addMonths } from 'date-fns';

import Plan from './Plan';

class Membership extends Model {
  static init(sequelize) {
    super.init(
      {
        temp_plan_id: Sequelize.VIRTUAL,
        start_date: Sequelize.DATEONLY,
        end_date: Sequelize.DATEONLY,
        price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async membership => {
      const { duration, price } = await Plan.findByPk(membership.temp_plan_id);

      membership.end_date = addMonths(
        parseISO(membership.start_date),
        duration
      );
      membership.price = Math.round(duration * price * 1e2) / 1e2;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Membership;
