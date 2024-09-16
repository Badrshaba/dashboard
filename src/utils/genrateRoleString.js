export const genrateRoleString = (roleNumber) => {
  let str = '';
  switch (roleNumber) {
    case 0:
      str = 'user';
      break;
    case 1:
      str = 'admin';
      break;
    case 2:
      str = 'broker';
      break;
    case 3:
      str = 'markter';
      break;
    case 4:
      str = 'sales';
      break;
    case 5:
      str = 'developer';
      break;
    default:
      str = 'user';
      break;
  }
  return str;
};
