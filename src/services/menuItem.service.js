// Imports
import MenuItem from './../entities/menuItem';

/**
 * @desc  MenuItemService class.
 * @ngInject
 */

const MenuItemService = ($state, $mdSidenav, AuthService, UserService, UserRoles) => {

  const service = {};

  // Actual menu items
  service.items = [
    {
      title: 'About',
      state: 'modules.about',
      access: UserRoles.ROLE_ANON,
    },
    {
      title: 'Profile',
      state: 'auth.profile',
      access: UserRoles.ROLE_LOGGED,
    },
    {
      title: 'Examples',
      state: 'modules.examples',
      access: UserRoles.ROLE_USER,
      items: [
        {
          title: 'Authors',
          state: false,
          access: UserRoles.ROLE_USER,
        },
        {
          title: 'Books',
          state: false,
          access: UserRoles.ROLE_USER,
        },
      ],
    },
    {
      title: 'Login',
      state: 'auth.login',
      access: UserRoles.ROLE_ANON,
      hideLogged: true,
    },
    {
      title: 'Logout',
      state: 'auth.logout',
      access: UserRoles.ROLE_LOGGED,
    },
  ].map(item => new MenuItem(item));


  /**
   * Getter method for all menu items.
   *
   * @returns {MenuItem[]}
   */
  service.getItems = () => {

    const iterator = (item) => {

      if (item.items.length) {
        item.items.filter(iterator);

        if (item.items.length === 0) {
          return false;
        }
      }

      let hasAccess = AuthService.authorize(item.access);

      if (hasAccess && item.hideLogged) {
        hasAccess = !UserService.getProfile();
      }

      return hasAccess;
    };

    return service.items.filter(iterator);
  };

  /**
   * Method to change application state to another one.
   *
   * @param {MenuItem}  item
   * @param {Object}    [params]
   * @returns {promise}
   */
  service.goToPage = (item, params = {}) => {

    const parameters = (Object.is({}, params) && !Object.is({}, item.params)) ? item.params : params;

    $mdSidenav('left').close();

    return ($state.current.name === item.state) ? $state.reload() : $state.go(item.state, parameters);
  };

  return service;
};

export default MenuItemService;
