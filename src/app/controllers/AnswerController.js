import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderAnsweredMail from '../jobs/HelpOrderAnsweredMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const helpOrder = await HelpOrder.findByPk(req.params.help_order_id);

    if (!helpOrder) {
      return res.status(404).json({ error: 'Help Order not found' });
    }

    return res.json(helpOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    let helpOrder = await HelpOrder.findByPk(req.params.help_order_id);

    if (!helpOrder) {
      return res.status(404).json({ error: 'Help Order not found' });
    }

    await helpOrder.update({
      answer: req.body.answer,
      answered_at: new Date(),
    });

    helpOrder = await HelpOrder.findByPk(helpOrder.id, {
      where: {
        student_id: req.params.student_id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(HelpOrderAnsweredMail.key, {
      helpOrder,
    });

    return res.json(helpOrder);
  }
}

export default new AnswerController();
