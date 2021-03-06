import { Router } from 'express';
import db from 'db/connection';

const SeedRoutes = Router();
SeedRoutes.post('/api/seed', async (req, res) => {
  for (const data of req.body.data) {
    await db(req.body.tableName).insert({ ...data });
  }

  res.sendStatus(200);
});

SeedRoutes.post('/api/clear', async (req, res) => {
  await db(req.body.tableName).del();

  res.sendStatus(200);
});

export default SeedRoutes;