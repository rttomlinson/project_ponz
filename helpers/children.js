module.exports = {
  sortChildren = function(children) {
    let childMap = children.map(function(child) {
        if (child.children.length == 0) {
          return child.email;
        }
        else {
          sortChildren(child)
        }
      });
      return list;
    };
};
