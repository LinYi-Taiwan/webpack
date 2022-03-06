// index.js: webpack entry file
/**
 * 1. 韻玲指令
 * webpack ./src/index.js -o ./build/build.js --mode=development
 * 2. 生產環境
 * webpack ./src/index.js -o ./build/build.js --mode=production
 */

const add = (x, y) => {
  return x + y;
};

console.log(1 + 2 + add(2, 3));
