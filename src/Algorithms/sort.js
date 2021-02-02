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

const createBuckets = (array, bucketSize) => {
  let minValue = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i];
    }
  }

  const buckets = [];

  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
    if (buckets[bucketIndex]) {
      buckets[bucketIndex].push(array[i]);
    } else {
      buckets[bucketIndex] = [array[i]];
    }
  }
  return buckets;
};

/**
 * 桶排序通过计算待排序数组里面的每一个元素与最小元素的差值除以每个桶的大小，
 * 以此得出当前元素属于具体某一个桶，通过这样的方式得到的桶数组其实已经经过一次排序，
 * 当前的桶的最小值必定大于前一个桶的最大值，然后依次对桶进行排序
 */
const sortBuckets = (array) => {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      result.push(...countSort(array[i]));
    }
  }
  return result;
};

export const bucketSort = (array, bucketSize = 5) => {
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize);
  return sortBuckets(buckets);
};

/**
 * 基数排序
 */
const countingSortForRadix = (array, radixBase, significantDigit, minValue) => {
  let bucketsIndex;
  const buckets = [];
  const aux = [];

  for (let i = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }

  for (let i = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    buckets[bucketsIndex]++;
  }

  for (let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];
  }

  for (let i = 0; i < array.length; i++) {
    bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
    aux[--buckets[bucketsIndex]] = array[i];
  }

  for (let i = 0; i < array.length; i++) {
    array[i] = aux[i];
  }

  return array;
};

export const radixSort = (array, radixBase = 10) => {
  if (array.length < 2) return array;
  const minValue = Math.min(array);
  const maxValue = Math.max(array);

  let significantDigit = 1;
  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    significantDigit *= radixBase;
  }

  return array;
};

/**
 * 顺序搜索
 */
export const sequentialSearch = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
};

/**
 * 二分搜索
 */
export const binarySearch = (array, value) => {
  const sortedArray = quickSort(array);
  let minIndex = 0;
  let maxIndex = sortedArray.length - 1;

  while (minIndex <= maxIndex) {
    const mid = Math.floor((minIndex + maxIndex) / 2);
    const element = sortedArray[mid];

    if (element < value) {
      minIndex = mid + 1;
    } else if (element > value) {
      maxIndex = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
};
