# is-apple-silicon
Provides three synchronous boolean returning functions for use in verifying the correct Node binary is executing on a
developer's Mac with Apple Silicon.

Useful for preventing headaches with passing `node_modules` with native add-ons compiled for differing architectures into Docker.

```javascript
const { isAppleSilicon, isNodeNative, isRosetta } = require('is-apple-silicon');

// Node 14 (before Arm64 support), on an MacBook Pro with M1
{ isAppleSilicon: true, isNodeNative: false, isRosetta: true }

// Node 16 (for arm64), on a MacBook Pro with M1
{ isAppleSilicon: true, isNodeNative: true, isRosetta: false }

// Node 16 (for x64), on an Intel MacBook Pro
{ isAppleSilicon: false, isNodeNative: true, isRosetta: false }

```