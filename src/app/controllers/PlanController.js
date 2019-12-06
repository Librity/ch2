import { Op } from 'sequelize';
import * as Yup from 'yup';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1, requestsPerPage = 20 } = req.query;
    const pagination = {
      order: [['id', 'ASC']],
      limit: requestsPerPage,
      offset: (page - 1) * requestsPerPage,
    };

    const plans = await Plan.findAndCountAll(pagination);

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

    const findPlanById = await Plan.findByPk(req.params.plan_id);

    if (!findPlanById) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    await findPlanById.update(req.body);

    return res.json(findPlanById);
  }

  async destroy(req, res) {
    const findPlanById = await Plan.findByPk(req.params.plan_id);

    if (!findPlanById) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    await findPlanById.destroy();

    return res.json(findPlanById);
  }
}

export default new PlanController();
