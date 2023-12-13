const { cpus, arch } = require('os');

let appleSiliconCheck = null;
let archCheck = null;

const isAppleSilicon = (forceCheck = false) => {
    if (forceCheck || appleSiliconCheck === null) {
        appleSiliconCheck = cpus().some(cpu => cpu.model.includes('Apple'));
    }
    return appleSiliconCheck;
};

const getArch = (forceCheck = false) => {
    if (forceCheck || archCheck === null) {
        archCheck = arch();
    }
    return archCheck;
};

const isNodeNative = (forceCheck = false) => isAppleSilicon(forceCheck) ? getArch(forceCheck) === 'arm64' : true;

const isRosetta = (forceCheck = false) => isAppleSilicon(forceCheck) && getArch(forceCheck) === 'x64';

module.exports = {
    isAppleSilicon,
    isNodeNative,
    isRosetta
};
