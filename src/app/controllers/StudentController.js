import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {

    return res.json();
  }

//   async show(req, res) {
//     return res.json(findUserById);
//   }

//   async create(req, res) {
//   }

//   async updateSelf(req, res) {
//     }

//     if (oldPassword && !(await user.checkPassword(oldPassword))) {
//       return res.status(401).json({ error: 'Password does not match.' });
//     }

//     const { id, name } = await user.update(req.body);

//     return res.json({ id, name, email });
//   }

//   async update(req, res) {
//   }

//   async destroy(req, res) {

//     return res.json({ user });
//   }
}

export default new UserController();
