import { connect } from 'react-redux'
import { NextPage } from 'next'
import Link from 'next/link'
import ListItem, {
  ListItemTitle,
  ListItemSubtitle,
} from '~/components/ListItem'
import { getRelativeTime } from '~/utils'
import { receiveCategoryThunk, receiveItemsThunk } from '~/store/actions'
import { createCategorySelector, State } from '~/store'
import { HNCategory, HNStory } from '~/types'

interface CreateCategoryPageArgs {
  category: HNCategory
  page?: number
  itemsPerPage?: number
}
function creareCategoryPage<ItemType extends HNStory>({
  category,
  page = 0,
  itemsPerPage = 50,
}: CreateCategoryPageArgs) {
  interface PageComponentProps {
    items: ItemType[]
    page: number
  }
  const PageComponent: NextPage<PageComponentProps> = ({ items, page }) => {
    const shouldShowMoreButton = items.length >= itemsPerPage

    return (
      <ol className="pl-0">
        {items.map((item, index) => (
          <li key={item.id} className="mb-1">
            <ListItem index={index + 1 + page * itemsPerPage}>
              <ListItemTitle>
                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                  {item.title}
                </a>
              </ListItemTitle>
              <ListItemSubtitle>
                {item.score} points by{' '}
                <Link href="/user/[id]" as={`/user/${item.by}`}>
                  <a>{item.by} </a>
                </Link>
                {getRelativeTime(item.time)} |{' '}
                <Link href="/item/[id]" as={`/item/${item.id}`}>
                  <a>
                    {item.descendants
                      ? `${item.descendants} comments`
                      : 'discuss'}
                  </a>
                </Link>
              </ListItemSubtitle>
            </ListItem>
          </li>
        ))}

        {shouldShowMoreButton && (
          <a
            href={`?page=${page + 1}`}
            className="block pl-10 pt-2 text-sm text-gray-700"
          >
            More
          </a>
        )}
      </ol>
    )
  }

  PageComponent.getInitialProps = async ({ store, query }) => {
    const page = Number(query.page) || 0
    if (store.getState()[category].length > 0)
      return { page } as PageComponentProps

    await store.dispatch<any>(receiveCategoryThunk(category))
    const itemIds = store
      .getState()
      [category].slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage)

    // TODO: dispatch typings
    await store.dispatch<any>(receiveItemsThunk(itemIds))
    return { page } as PageComponentProps
  }

  const categorySelector = createCategorySelector(category)

  const connector = connect((state: State) => ({
    items: categorySelector(state),
  }))

  return connector(PageComponent as React.FC)
}

export default creareCategoryPage
