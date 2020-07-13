import config from './config.json';
import controller from './model/controller';
import model from './model';

import { validateNewUser } from './workers/validation';

export default Object.freeze({
  config,
  controller,
  model,
  pages: {},
  containers: {},
  components: {},
  workers: { validateNewUser },
});
