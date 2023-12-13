declare module 'is-apple-silicon' {
  export function isAppleSilicon(forceCheck?: boolean): boolean;

  export function isNodeNative(forceCheck?: boolean): boolean;

  export function isRosetta(forceCheck?: boolean): boolean;
}
