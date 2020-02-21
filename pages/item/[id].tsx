import { NextPage } from 'next'
import { HNItem, HNItemType, RenderHNItem } from '~/types'
import { receiveItemsThunk } from '~/store/actions'
import ItemComment from '~/components/ItemComment'
import ItemStory from '~/components/ItemStory'

const mapItemToComponent = (item: RenderHNItem): React.FC<any> => {
  const map: Record<HNItemType, React.FC<any>> = {
    story: ItemStory,
    comment: ItemComment,

    job: ItemComment,
    poll: ItemComment,
    pollopt: ItemComment,
  }

  return map[item.type]
}
interface ItemPageProps {
  item: RenderHNItem
}
const ItemPage: NextPage<ItemPageProps> = ({ item }) => {
  const ItemComponent = mapItemToComponent(item)

  return <ItemComponent item={item} />
}

ItemPage.getInitialProps = async ({ store, query }) => {
  const id = Number(query.id)

  if (!store.getState().items[id]) {
    await store.dispatch<any>(receiveItemsThunk([id]))
  }

  // Fething item's kids, their kids etc. recursively
  async function getItemWithKids(item: HNItem): Promise<RenderHNItem> {
    if (!item.kids) {
      return (item as unknown) as RenderHNItem
    }

    const kidItems = await Promise.all(
      item.kids.map(async id => {
        const state = store.getState()

        if (state.items[id]) {
          return state.items[id]
        }

        await store.dispatch(receiveItemsThunk([id]))

        return store.getState().items[id]
      }),
    )
    const kidItemsWithKids = await Promise.all(kidItems.map(getItemWithKids))
    const nextItem = { ...item, kids: kidItemsWithKids }

    return nextItem
  }

  const item = await getItemWithKids(store.getState().items[id])

  return { item }
}

export default ItemPage
