export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout | null

  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      result = func(...args)
    }, wait)

    return result
  }
}
