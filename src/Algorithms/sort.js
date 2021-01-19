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

/**
 * 选择排序每次循环找到当前最小值，然后放在数组的前端
 *
 * @param array {Array} 待排序数组
 */
export const selectionSort = (array) => {
  let minValueIndex;

  for (let i = 0; i < array.length - 1; i += 1) {
    minValueIndex = i;
    for (let j = i; j < array.length; j += 1) {
      if (array[minValueIndex] > array[j]) {
        minValueIndex = j;
      }
    }

    if (i !== minValueIndex) {
      [array[minValueIndex], array[i]] = [array[i], array[minValueIndex]];
    }
  }
};

/**
 * 插入排序每次循环拿当前的值和之前的值依次比较大小，然后互相交换直到结束
 *
 * @param array {Array} 待排序数组
 */
export const insertionSort = (array) => {
  for (let i = 1; i < array.length; i += 1) {
    let j = i;
    const temp = array[i];

    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1];
      j -= 1;
    }

    array[j] = temp;
  }
};

export const insertionSortOther = (array) => {
  for (let i = 1; i < array.length; i += 1) {
    let j = i;

    while (j > 0 && array[j - 1] > array[j]) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      j -= 1;
    }
  }
};
