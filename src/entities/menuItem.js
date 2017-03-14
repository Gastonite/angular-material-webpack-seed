// Imports
// import MenuItemInterface from './menuItem.interface';
// interface MenuItemInterface {
//   title: string,
//   state: string,
//   access: string,
//   hideLogged: boolean,
//   params: any,
//   items: MenuItemInterface[],
//   open: boolean,
// }

const MenuItem = item => {

  const menuItem = {};

  menuItem.title = item.title;
  menuItem.state = item.state;
  menuItem.access = item.access;
  menuItem.hideLogged = !!item.hideLogged;
  menuItem.params = item.params || {};
  menuItem.items = (item.items || []).map(MenuItem);
  menuItem.open = !!item.open;

  return menuItem;
};

export default MenuItem;