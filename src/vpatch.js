class VPatch {
  constructor (type, vnode, patch) {
    this.type = type;
    this.vnode = vnode;
    this.patch = patch;
  }
}

VPatch.NODE = 0;
VPatch.VTEXT = 1;
VPatch.VNODE = 2;
VPatch.PROPS = 3;
VPatch.ORDER = 4;
VPatch.INSERT = 5;
VPatch.REMOVE = 6;

module.exports = VPatch;