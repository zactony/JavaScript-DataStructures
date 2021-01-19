/**
 * 冒泡排序比较相邻的两个项，如果前者大于后者，则交换
 * 第一个循环控制轮数，第二个循环才是需要比较交换的地方
 *
 * @param array {Array} 待排序数组
 */
export const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length - 1; j += 1) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
};

/**
 * 优化后的冒泡排序，内循环减去外层以及循环的轮数
 *
 * @param array {Array} 待排序数组
 */
export const modifiedBubbleSort = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array.length - 1 - i; j += 1) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
};

export const a = () => {};
