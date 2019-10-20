export default async (req, res, next) => {
  try {
    if (!req.isAdmin) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    return next();
  } catch (err) {
    return res.status(403).json({ error: 'Access denied.' });
  }
};
