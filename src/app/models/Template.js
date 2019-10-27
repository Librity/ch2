import Sequelize, { Model } from 'sequelize';

class Example extends Model {
  static init(sequelize) {
    super.init(
      {
        example: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async example => {
      return example;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Example, { foreignKey: 'example_id', as: 'example' });
  }
}

export default Example;
