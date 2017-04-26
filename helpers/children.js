"use strict";

let ChildrenHelpers = {};
ChildrenHelpers.listChildren = function(children) {
    let ul = "<ul>";
    children.forEach((children) => {
        ul += "<li>boo</li>";
    });
    ul += "</ul>";
    return ul;
};

module.exports = ChildrenHelpers;
