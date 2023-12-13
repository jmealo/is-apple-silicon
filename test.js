const os = require('os');
const { isAppleSilicon, isNodeNative, isRosetta } = require('./index');

jest.mock('os');

describe('Apple Silicon Detection Tests', () => {
    beforeEach(() => {
        // Reset the module to clear memoization
        jest.resetModules();
        // Reset the mock to clear calls
        os.cpus.mockReset();
        // Make sure os.arch is properly mocked
        os.arch.mockReset();
    });


    test('isAppleSilicon should correctly detect Apple Silicon', () => {
        os.cpus.mockReturnValue([{model: 'Apple M1'}]);
        expect(isAppleSilicon(true)).toBe(true);
        expect(os.cpus).toHaveBeenCalledTimes(1);
        expect(isAppleSilicon(false)).toBe(true);
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });

    test('isAppleSilicon should return false for non-Apple CPUs', () => {
        os.cpus.mockReturnValue([{model: 'Intel'}]);
        expect(isAppleSilicon(true)).toBe(false);
        expect(os.cpus).toHaveBeenCalledTimes(1);
        expect(isAppleSilicon(false)).toBe(false);
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });

    test('isNodeNative should return true on an Apple CPU with arm64 arch', () => {
        os.cpus.mockReturnValue([{model: 'Apple M1'}]);
        os.arch.mockReturnValue('arm64');
        expect(isNodeNative(true)).toBe(true);
        expect(os.cpus).toHaveBeenCalledTimes(1);
        expect(isNodeNative(false)).toBe(true);
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });

    test('isNodeNative should return false on an Apple CPU with x64 arch', () => {
        os.cpus.mockReturnValue([{model: 'Apple M1'}]);
        os.arch.mockReturnValue('x64');
        expect(isNodeNative(true)).toBe(false);
        expect(os.cpus).toHaveBeenCalledTimes(1);
        expect(isNodeNative(false)).toBe(false);
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });

    test('isRosetta should return true on an Apple CPU with x64 arch', () => {
        os.cpus.mockReturnValue([{model: 'Apple M1'}]);
        os.arch.mockReturnValue('x64');
        expect(isRosetta(true)).toBe(true);
        expect(os.cpus).toHaveBeenCalledTimes(1);
        expect(isRosetta(false)).toBe(true);
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });

    test('isRosetta should return false on an Apple CPU with arm64 arch', () => {
        os.cpus.mockReturnValue([{model: 'Apple M1'}]);
        os.arch.mockReturnValue('arm64');
        expect(isRosetta(true)).toBe(false);
        expect(os.cpus).toHaveBeenCalledTimes(1);
        expect(isRosetta(false)).toBe(false);
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });

    test('Memoization should prevent repeated cpus() calls', () => {
        os.cpus.mockReturnValue([{model: 'Apple M1'}]);
        expect(os.cpus).toHaveBeenCalledTimes(0);
        isAppleSilicon(true); // First call, cache miss
        expect(os.cpus).toHaveBeenCalledTimes(1);
        isAppleSilicon(); // Second call, cache hit
        expect(os.cpus).toHaveBeenCalledTimes(1);
    });
});
