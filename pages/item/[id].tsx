import { NextPage } from 'next'
import axios from 'axios'
import Comment from '~/components/Comment'
import { HNItem } from '~/types'
import { getItemById } from '~/api'

interface ItemPageProps {
  item: HNItem
  kids: any[]
}

const ItemPage: NextPage<ItemPageProps> = ({ item, kids }) => {
  return (
    <>
      <pre>{JSON.stringify(item, undefined, 2)}</pre>
      <pre>{JSON.stringify(kids, undefined, 2)}</pre>
    </>
  )
}

ItemPage.getInitialProps = async ctx => {
  const deepFetch = async (id: string | number): Promise<ItemPageProps> => {
    console.count()
    console.log('1-df ', id)
    const item = await getItemById(id)
    let kids: any[] = []

    if (!item.kids) return { item, kids }

    kids = await Promise.all(item.kids.map(id => deepFetch(id)))
    console.log('2-df ', id)

    return { item, kids }
  }
  const props = await deepFetch(ctx.query.id as string)

  return props
}

export default ItemPage
