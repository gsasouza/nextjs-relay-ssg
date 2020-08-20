const SIZE = 10;

export default new Array(SIZE).fill(null).map((_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user_${index + 1}@domain.com`,
  picture: 'https://via.placeholder.com/150',
}));
