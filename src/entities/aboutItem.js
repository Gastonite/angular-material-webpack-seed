
export default (item) => {

  const aboutItem = {};

  aboutItem.title = item.title;
  aboutItem.url = item.url;
  aboutItem.image = item.image;

  return aboutItem;
};

// interface AboutItemInterface {
//   image: any,
//   title: string,
//   url: string,
// }

