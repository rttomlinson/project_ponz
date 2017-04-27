module.exports = {
  getMoney: function getMoney(depth) {
    switch (depth) {
      case 1:
        return 40;
      case 2:
        return 20;
      case 3:
        return 10;
      case 4:
        return 5;
      case 5:
        return 2;
      default:
        return 1;
    }
  }
};
