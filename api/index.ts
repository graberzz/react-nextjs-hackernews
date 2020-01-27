import db from './firebase'
import { HNItem, HNUser } from '~/types'

const get = async (path: string): Promise<any> => {
  const snapshot = await db.ref(`v0${path}`).once('value')

  return snapshot.val()
}

export const getItemById = async <T extends HNItem>(
  id: string | number,
): Promise<T> => {
  const item = await get(`/item/${id}`)

  return item
}

export const getUserById = async (id: string | number): Promise<HNUser> => {
  const user = await get(`/user/${id}`)

  return user
}

export const getTopStories = (): Promise<number[]> => get('/topstories')
export const getNewStories = (): Promise<number[]> => get('/newstories')
export const getAskStories = (): Promise<number[]> => get('/askstories')
export const getShowStories = (): Promise<number[]> => get('/showstories')
export const getJobStories = (): Promise<number[]> => get('/jobstories')
