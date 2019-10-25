import { Op } from 'sequelize';
import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const titleAlreadyUsed = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (titleAlreadyUsed) {
      return res.status(400).json({ error: 'Title already in use' });
    }

    const newPlan = await Plan.create(req.body);

    return res.json(newPlan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const titleAlreadyUsed = await Plan.findOne({
      where: { title: req.body.title, id: { [Op.ne]: req.params.id } },
    });

    if (titleAlreadyUsed) {
      return res.status(400).json({ error: 'Title already in use' });
    }

    const plan = await Plan.findByPk(req.params.id);
    await plan.update(req.body);

    return res.json(plan);
  }

  async destroy(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    await plan.destroy();

    return res.json(plan);
  }
}

export default new PlanController();
