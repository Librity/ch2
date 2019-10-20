import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight_metric: Sequelize.INTEGER,
        weight_imperial: Sequelize.INTEGER,
        height_metric: Sequelize.INTEGER,
        height_imperial: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async student => {
      if (student.weight_metric) {
        student.weight_imperial = student.weight_metric * 2.205;
      } else if (student.weight_imperial) {
        student.weight_metric = student.weight_imperial * 0.454;
      }

      if (student.height_metric) {
        student.height_imperial = student.height_metric * 3.281;
      } else if (student.height_imperial) {
        student.height_metric = student.height_imperial * 0.305;
      }
    });

    return this;
  }
}

export default Student;
