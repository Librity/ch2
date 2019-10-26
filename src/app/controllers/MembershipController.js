import * as Yup from 'yup';

import Student from '../models/Student';
import Plan from '../models/Plan';
import Membership from '../models/Membership';

import MembershipCreationMail from '../jobs/MembershipCreationMail';
import MembershipUpdateMail from '../jobs/MembershipUpdateMail';
import MembershipCancellationMail from '../jobs/MembershipCancellationMail';
import Queue from '../../lib/Queue';

class PlanController {
  async index(req, res) {
    const memberships = await Membership.findAll();

    return res.json(memberships);
  }

  async show(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentMemberships = await Membership.findAll({
      where: { student_id: req.params.student_id },
    });

    return res.json(studentMemberships);
  }

  async store(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const findPlanById = await Plan.findByPk(req.body.plan_id);

    if (!findPlanById) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    if (!req.body.start_date) {
      req.body.start_date = new Date();
    }

    let newMembership = await Membership.create({
      student_id: req.params.student_id,
      plan_id: req.body.plan_id,
      temp_plan_id: req.body.plan_id,
      start_date: req.body.start_date,
    });

    newMembership = await Membership.findByPk(newMembership.id, {
      where: {
        student_id: req.params.student_id,
        plan_id: req.body.plan_id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title', 'symbol', 'duration', 'price'],
        },
      ],
    });

    await Queue.add(MembershipCreationMail.key, {
      newMembership,
    });

    return res.json(newMembership);
  }

  async update(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const findPlanById = await Plan.findByPk(req.body.plan_id);

    if (!findPlanById) {
      return res.status(400).json({ error: 'Plan not found.' });
    }

    const findMembershipById = await Membership.findByPk(
      req.params.membership_id,
      {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['title', 'symbol', 'duration', 'price'],
          },
        ],
      }
    );

    if (!findMembershipById) {
      return res.status(400).json({ error: 'Membership not found.' });
    }

    if (!req.body.start_date) {
      await findMembershipById.update({
        plan_id: req.body.plan_id,
        temp_plan_id: req.body.plan_id,
      });
    } else {
      await findMembershipById.update({
        plan_id: req.body.plan_id,
        temp_plan_id: req.body.plan_id,
        start_date: req.body.start_date,
      });
    }

    await Queue.add(MembershipUpdateMail.key, {
      findMembershipById,
    });

    return res.json(findMembershipById);
  }

  async destroy(req, res) {
    const findStudentById = await Student.findByPk(req.params.student_id);

    if (!findStudentById) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const findMembershipById = await Membership.findByPk(
      req.params.membership_id,
      {
        include: [
          {
            model: Student,
            as: 'student',
            attributes: ['name', 'email'],
          },
          {
            model: Plan,
            as: 'plan',
            attributes: ['title', 'symbol', 'duration', 'price'],
          },
        ],
      }
    );

    if (!findMembershipById) {
      return res.status(400).json({ error: 'Membership not found.' });
    }

    await findMembershipById.destroy();

    await Queue.add(MembershipCancellationMail.key, {
      findMembershipById,
    });

    return res.json(findMembershipById);
  }
}

export default new PlanController();
