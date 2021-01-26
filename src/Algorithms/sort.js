/**
 * 冒泡排序比较相邻的两个项，如果前者大于后者，则交换
 * 第一个循环控制轮数，第二个循环才是需要比较交换的地方
 *
 * @param array {Array} 待排序数组
 */
export const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1; j++) {
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
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
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

  for (let i = 0; i < array.length - 1; i++) {
    minValueIndex = i;
    for (let j = i; j < array.length; j++) {
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
  for (let i = 1; i < array.length; i++) {
    let j = i;
    const temp = array[i];

    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1];
      j--;
    }

    array[j] = temp;
  }
};

export const insertionSortOther = (array) => {
  for (let i = 1; i < array.length; i++) {
    let j = i;

    while (j > 0 && array[j - 1] > array[j]) {
      [array[j - 1], array[j]] = [array[j], array[j - 1]];
      j -= 1;
    }
  }
};

/**
 * 归并排序是将大数组递归分割成小数组，然后依次比较小数组的大小，
 * 最后依次返回成有序的数组
 */
const merge = (left, right) => {
  let i = 0;
  let j = 0;
  const result = [];
  while (i < left.length && j < right.length) {
    result.push(left[i] > right[j] ? left[i++] : right[j++]);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
};

export const mergeSort = (array) => {
  if (array.length > 1) {
    const { length } = array;
    const middle = Math.floor(length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle, length));
    array = merge(left, right);
  }
  return array;
};

/**
 * 快速排序基于每次选择的元素作为主元，然后头尾依次比较，前者比主元大的以及
 * 后者比主元小的两者互相交换，然后继续分割数组递归比较
 */
const partition = (array, leftIndex, rightIndex) => {
  const pivot = array[Math.floor((leftIndex + rightIndex) / 2)];
  let i = leftIndex;
  let j = rightIndex;

  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }

    while (array[j] > pivot) {
      j--;
    }

    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
  }

  return i;
};

export const quickSort = (array, leftIndex, rightIndex) => {
  let index;
  if (array.length > 1) {
    index = partition(array, leftIndex, rightIndex);
    if (leftIndex < index - 1) {
      quickSort(array, leftIndex, index - 1);
    }
    if (index < rightIndex) {
      quickSort(array, index, rightIndex);
    }
  }
  return array;
};

/**
 * 计数排序通过将值做为临时数组的下标，统计该值出现的次数
 * 随后循环该临时数组，根据出现的次数依次将下标推进新数组然后返回
 */
export const countSort = (array) => {
  const temp = [];
  for (let i = 0; i < array.length; i++) {
    const index = array[i];
    if (temp[index]) {
      temp[index]++;
    } else {
      temp[index] = 1;
    }
  }

  const result = [];
  temp.reduce((acc, curr, index) => {
    let count = curr;
    while (count) {
      acc.push(index);
      count--;
    }
    return acc;
  }, result);

  return result;
};
