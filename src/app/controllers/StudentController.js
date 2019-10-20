import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const getAllStudents = await Student.findAll();

    return res.json(getAllStudents);
  }

  async show(req, res) {
    const findStudentById = await Student.findOne({
      where: { id: req.params.id },
    });

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

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (email && email !== student.email) {
      const studentExists = await Student.findOne({
        where: { email },
      });

      if (studentExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    } else {
      email = student.email;
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
    } = await student.update(req.body);

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
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({ erro: 'Student not found.' });
    }

    await Student.destroy({ where: { id: req.params.id } });

    return res.json(student);
  }
}

export default new StudentController();
