import auth from './modules/auth';
import devAuth from './modules/developerAuth';
import profiles from './modules/profiles';
import objects from './modules/objects';
import inventory from './modules/inventory';
import leaderboards from './modules/leaderboards';

export default client => ({
  auth: auth(client),
  devAuth: devAuth(client),
  profiles: profiles(client),
  objects: objects(client),
  inventory: inventory(client),
  leaderboards: leaderboards(client),
});
