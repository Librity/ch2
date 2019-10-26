// import { Op } from 'sequelize';
// import * as Yup from 'yup';

import Membership from '../models/Membership';

class PlanController {
  async index(req, res) {
    const memberships = await Membership.findAll();

    return res.json(memberships);
  }

  async show(req, res) {
    return res.json();
  }

  async store(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }

  async destroy(req, res) {
    return res.json();
  }
}

export default new PlanController();
