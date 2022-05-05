const { cpus } = require('os');
const { arch } = require('process');

const isAppleSilicon = () => cpus().some(cpu => cpu.model.includes('Apple'));
const isNodeNative = () => isAppleSilicon() ? arch === 'arm64' : true;
const isRosetta = () => isAppleSilicon() && arch === 'x64';

module.exports = {
    isAppleSilicon,
    isNodeNative,
    isRosetta
};

