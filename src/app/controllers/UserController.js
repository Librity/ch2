import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    let getAllUsers;

    if (req.isAdmin) {
      getAllUsers = await User.findAll({
        attributes: ['id', 'name', 'email', 'admin', 'createdAt', 'updatedAt'],
      });
    } else {
      getAllUsers = await User.findAll({
        attributes: ['id', 'name', 'email', 'createdAt'],
      });
    }

    return res.json(getAllUsers);
  }

  async show(req, res) {
    const { id } = req.params;
    let findUserById;

    if (req.isAdmin) {
      findUserById = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'admin', 'createdAt', 'updatedAt'],
      });
    } else {
      findUserById = await User.findOne({
        where: { id },
        attributes: ['id', 'name', 'email', 'createdAt'],
      });
    }

    if (!findUserById) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(findUserById);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      admin: Yup.boolean(),
      password: Yup.string()
        .required()
        .min(6),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, admin } = await User.create(req.body);

    return res.json({ id, name, email, admin });
  }

  async updateSelf(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      passwordConfirmation: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      admin: Yup.boolean().notOneOf([true]),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const bodySchema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      admin: Yup.boolean(),
      password: Yup.string().min(6),
    });

    if (!(await bodySchema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const { email } = req.body;

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'Email already in use.' });
      }
    }

    const { id, name, admin } = await user.update(req.body);

    return res.json({ id, name, email, admin });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json('User not found.');
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.json({ user });
  }
}

export default new UserController();
