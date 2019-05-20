import auth from './modules/auth';
import devAuth from './modules/developerAuth';
import profiles from './modules/profiles';
import inventory from './modules/inventory';

export default client => ({
  auth: auth(client),
  devAuth: devAuth(client),
  profiles: profiles(client),
  inventory: inventory(client),
});
