import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { requestsPerPage = 20 } = req.query;

    const checkins = await Checkin.findAll({
      order: [['updated_at', 'DESC']],
      limit: requestsPerPage,
      offset: (page - 1) * requestsPerPage,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
      ],
    });

    return res.json(checkins);
  }

  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const { page = 1 } = req.query;
    const { requestsPerPage = 20 } = req.query;

    const studentCheckins = await Checkin.findAll({
      order: [['updated_at', 'DESC']],
      limit: requestsPerPage,
      offset: (page - 1) * requestsPerPage,
      where: { student_id: req.params.student_id },
    });

    return res.json(studentCheckins);
  }

  async store(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const rightNow = Number(new Date());
    const sevenDaysAgo = subDays(rightNow, 7);

    const checinksThisWeek = await Checkin.findAndCountAll({
      where: {
        student_id: req.params.student_id,
        created_at: {
          [Op.between]: [sevenDaysAgo, rightNow],
        },
      },
    });

    if (checinksThisWeek.count >= 5) {
      return res.status(403).json({
        error: 'Students can only checkin 5 times in the last 7 days.',
      });
    }

    const newCheckin = await Checkin.create({
      student_id: req.params.student_id,
    });

    return res.json(newCheckin);
  }
}

export default new CheckinController();
