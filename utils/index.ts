/**
 * @description 一维数组转二维数组
 * @param array 被切割的数组
 * @param n 切割的个数
 * @returns []
 */
export type ArrayDimensionalTransformType<T = any> = (target: Array<T>, n: number) => Array<T>
export const arrayDimensionalTransform = (target: [], n: number) => {
  const len = target.length
  const lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1)
  const res = []
  for (let i = 0; i < lineNum; i++) {
    // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
    const temp = target.slice(i * n, i * n + n)
    res.push(temp)
  }
  return res
}

/**
 * @description 单词首字母大写
 */
export const firstLetterCapitl = (str: string) => {
  return str.replace(/^\S/, s => s.toUpperCase())
}
