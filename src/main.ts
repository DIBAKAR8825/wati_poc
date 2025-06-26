import express from 'express';
import routes from './api/routes';
import { config as dotenvConfig } from 'dotenv';
import { config } from './config/config';

dotenvConfig();

const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}`);
});
