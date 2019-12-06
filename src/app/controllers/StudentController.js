import { Op } from 'sequelize';
import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    let getAllStudents;
    const { name, page = 1, requestsPerPage = 20 } = req.query;
    const pagination = {
      order: [['name', 'ASC']],
      limit: requestsPerPage,
      offset: (page - 1) * requestsPerPage,
    };

    if (name) {
      getAllStudents = await Student.findAndCountAll({
        ...pagination,
        where: {
          name: {
            [Op.iRegexp]: `${name}`,
          },
        },
      });
    } else {
      getAllStudents = await Student.findAndCountAll(pagination);
    }

    return res.json(getAllStudents);
  }

  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.json(findStudentById);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      date_of_birth: Yup.date().required(),
      weight_metric: Yup.number(),
      height_metric: Yup.number(),
      weight_imperial: Yup.number(),
      height_imperial: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const {
      id,
      name,
      email,
      date_of_birth,
      age,
      weight_metric,
      weight_imperial,
      height_metric,
      height_imperial,
    } = await Student.create(req.body);

    return res.json({
      id,
      name,
      email,
      date_of_birth,
      age,
      weight_metric,
      weight_imperial,
      height_metric,
      height_imperial,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      date_of_birth: Yup.date(),
      weight_metric: Yup.number(),
      height_metric: Yup.number(),
      weight_imperial: Yup.number(),
      height_imperial: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    let { email } = req.body;

    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    if (email && email !== findStudentById.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    } else {
      email = findStudentById.email;
    }

    const {
      id,
      name,
      date_of_birth,
      age,
      weight_metric,
      weight_imperial,
      height_metric,
      height_imperial,
    } = await findStudentById.update(req.body);

    return res.json({
      id,
      name,
      email,
      date_of_birth,
      age,
      weight_metric,
      weight_imperial,
      height_metric,
      height_imperial,
    });
  }

  async destroy(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await findStudentById.destroy();

    return res.json(findStudentById);
  }
}

export default new StudentController();
