import { forEach } from '../util'

class VNode {
  constructor (tagName, props, children, key) {
    this.tagName = tagName || 'DIV';
    this.props = props || {};
    this.children = children || [];
    this.key = key || null;
    this.count = this.children.length;
    if (this.count) {
      forEach(this.children, (child) => {
        if (child && child.type === 'vnode') {
          this.count += child.count;
        }
      });
    }
  }
}

VNode.prototype.type = 'vnode';

module.exports = VNode;