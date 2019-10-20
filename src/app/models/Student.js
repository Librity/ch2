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
        student.weight_imperial = Math.round(student.weight_metric * 2.205);
      } else if (student.weight_imperial) {
        student.weight_metric = Math.round(student.weight_imperial * 0.454);
      }

      if (student.height_metric_meters && student.height_metric_centimeters) {
        student.height_imperial = Math.round(student.height_metric_meters * 2.205 + );
      } else if (student.height_imperial) {
        student.weight_metric = Math.round(student.weight_imperial * 0.454);
      }
    });

    return this;
  }
}

export default Student;
