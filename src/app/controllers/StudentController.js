// import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'age',
        'weight_metric',
        'weight_imperial',
        'height_metric',
        'height_imperial',
        'createdAt',
        'updatedAt',
      ],
    });

    return res.json(students);
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

export default new StudentController();
