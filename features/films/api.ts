import {top100Films} from './data';

type CancelablePromise = Promise<typeof top100Films> & {clear: () => void}
export function search(searchTerm: string): CancelablePromise {
  let timer: any
  const promise: any = new Promise<typeof top100Films>((resolve) => {
    timer = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase()
      if (!term) return resolve(top100Films)
      const nextFilms = top100Films.filter(
        film => film.title.toLowerCase().includes(term)
      )
      resolve(nextFilms)
    }, 500)
  })
  promise.cancel = () => clearTimeout(timer)
  return promise
}
