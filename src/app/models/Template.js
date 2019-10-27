import Sequelize, { Model } from 'sequelize';

class Template extends Model {
  static init(sequelize) {
    super.init(
      {
        template: Sequelize.TEXT,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async template => {
      return template;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Example, { foreignKey: 'example_id', as: 'example' });
  }
}

export default Template;
