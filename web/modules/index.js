import core from '~/../core';
import users from './users';

// worker modules
import userProfile from './user-profile';
// manager modules
import adminProfile from './admin-profile';
import adminUsers from './admin-users';
import adminSettings from './admin-settings';
import themes from './themes';
import languages from './languages';

core.add.to.modules = users;
core.add.to.modules = userProfile;
core.add.to.modules = adminProfile;
core.add.to.modules = adminSettings;
core.add.to.modules = adminUsers;
core.add.to.modules = themes;
core.add.to.modules = languages;
