import { Router } from 'express';

const AuthRoutes = Router();
AuthRoutes.post('/api/auth/login', (req, res) => {
  res.json({ message: 'This is why we are using apollo-server-express' });
});

export default AuthRoutes;