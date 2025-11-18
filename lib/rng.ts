// export function createPRNG(seedHex: string) {
//   let seed = parseInt(seedHex.slice(0, 8), 16) >>> 0;

//   return {
//     rand() {
//       seed ^= seed << 13;
//       seed ^= seed >> 17;
//       seed ^= seed << 5;
//       return (seed >>> 0) / 4294967296;
//     },
//   };
// }



// lib/rng.ts
export function createPRNG(hexSeed: string) {
  // seed from first 4 bytes (big-endian)
  const seedHex = hexSeed.slice(0, 8).padEnd(8, "0");
  let seed = parseInt(seedHex, 16) >>> 0;

  function xorshift32() {
    // returns uint32
    seed ^= seed << 13;
    seed = seed >>> 0;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    seed = seed >>> 0;
    return seed;
  }

  return {
    // return float in [0,1)
    rand() {
      const v = xorshift32();
      return (v >>> 0) / 4294967296;
    },
  };
}
