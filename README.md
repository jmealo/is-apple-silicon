# is-apple-silicon

This Node.js module provides synchronous utility functions for detecting Apple Silicon CPUs and assessing Node.js binary
compatibility. It is particularly useful for ensuring that `node_modules` with native add-ons are correctly compiled for
the target architecture, especially when working with Docker containers on Macs with Apple Silicon.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Expected Outputs](#expected-outputs)
- [Testing](#testing)
- [Contributing](#contributing)

## Installation

```bash
npm install is-apple-silicon
```

## Usage

The module exports three functions:

- `isAppleSilicon(forceCheck?)`: Determines if the system has an Apple Silicon CPU.
- `isNodeNative(forceCheck?)`: Checks if Node.js is running natively on the system's architecture.
- `isRosetta(forceCheck?)`: Identifies if the process is running under Rosetta translation on Apple Silicon.

Each function includes an optional forceCheck parameter, set to false by default. When true, this parameter bypasses the cached results and forces a fresh check of os.arch() and os.cpus().

## Examples

### CommonJS

```javascript
const {isAppleSilicon, isNodeNative, isRosetta} = require('is-apple-silicon');
```

### ESM

```javascript
import {isAppleSilicon, isNodeNative, isRosetta} from 'is-apple-silicon';
```

## Expected Outputs

Node.js 16+ is required for Apple Silicon support. Node.js 14 and earlier only supports x86 (it will always
return `false` for `isNodeNative()` on Apple Silicon).

#### On a MacBook Pro with Apple Silicon and Node 14 (no arm64 support):

- `isAppleSilicon() === true`
- `isNodeNative() === false`
- `isRosetta() === true`

#### On MacBook Pro with Apple Silicon and Node 16+ (arm64 support):

- `isAppleSilicon() === true`
- `isNodeNative() === true`
- `isRosetta() === false`

#### On Intel MacBook Pro with Node 16+ (x64):

- `isAppleSilicon() === false`
- `isNodeNative() === true`
- `isRosetta() === false`

#### On a non-Apple machine:

- `isAppleSilicon() === false`
- `isNodeNative() === true`
- `isRosetta() === false`

## Testing

The module includes a test script that can be run with `npm test`.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any bugs or feature requests.
