import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        symbol: Sequelize.STRING,
        duration: Sequelize.NUMBER,
        price: Sequelize.NUMBER,
        total_price: Sequelize.NUMBER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async plan => {
      plan.total_price = Math.round(plan.duration * plan.price * 1e2) / 1e2;
    });

    return this;
  }
}

export default Plan;
