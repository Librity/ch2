import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    const { unanswered = true } = req.query;
    const where = { answer: null };
    let helpOrders;

    if (unanswered) {
      helpOrders = await HelpOrder.findAll({ where });
    } else {
      helpOrders = await HelpOrder.findAll();
    }

    return res.json(helpOrders);
  }

  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { unanswered = true } = req.query;
    const where = { answer: null };
    let helpOrders;

    if (unanswered) {
      helpOrders = await HelpOrder.findAll({ where });
    } else {
      helpOrders = await HelpOrder.findAll();
    }

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const newHelpOrder = await HelpOrder.create({
      student_id: req.params.student_id,
      question: req.body.question,
    });

    return res.json(newHelpOrder);
  }
}

export default new HelpOrderController();
