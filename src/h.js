import VNode from './vnode/vnode';
import VText from './vnode/VText';
import { isVNode, isVText } from './vnode/types';
import { type, forEach } from './util';

function h (tagName, props, children) {
  let key, childNodes = [];
  props = props || {};
  if (props.hasOwnProperty('key') && props.key) {
    key = props.key;
    delete props.key;
  }
  tagName = parseTagName(tagName, props);
  if (children) {
    addChildren(childNodes, children, tagName);
  }
  return new VNode(tagName, props, childNodes, key);
}

function addChildren (childNodes, children, tagName) {
  if (type(children) === 'string') {
    childNodes.push(new VText(children));
  } else if (isChild(children)) {
    childNodes.push(children);
  } else if (type(children) === 'array') {
    forEach(children, child => addChildren(childNodes, child, tagName));
  } else {
    throw new Error('unexpected type');
  }
}

function isChild (node) {
  return isVNode(node) || isVText(node);
}

const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
const classId = /^\.|#/;

function parseTagName (tagName, props) {
  if (!tagName || type(tagName) !== 'string') {
    return 'DIV';
  }
  let tag = null;
  const tagSplits = tagName.split(classIdSplit);
  if (classId.test(tagSplits[1])) {
    tag = 'DIV';
  } else {
    tag = tagSplits[1].toUpperCase();
  }
  forEach(tagSplits, part => {
    if (!part) {
      return;
    }
    if (/^\./.test(part)) {
      if (type(props.className) === 'string') {
        props.className += ` ${part.substring(1, part.length)}` 
      } else {
        props.className = part.substring(1, part.length);
      }
    } else if (/^#/.test(part)) {
      props.id = part.substring(1, part.length);
    }
  });
  return tag;
}

module.exports = h;