import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/User';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
  } catch (err) {
    return res.status(401).json({ error: 'Token not valid.' });
  }

  const id = req.userId;

  try {
    req.isAdmin = (await User.findOne({
      where: { id },
      attributes: ['admin'],
    })).admin;

    return next();
  } catch (err) {
    return res.status(403).json({ error: 'Access denied.' });
  }
};
