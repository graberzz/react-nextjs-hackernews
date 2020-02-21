import Link from 'next/link'
import ItemComment from './ItemComment'
import { RenderHNStory } from '~/types'
import ListItem, {
  ListItemTitle,
  ListItemSubtitle,
} from '~/components/ListItem'
import { getRelativeTime } from '~/utils'

const ItemStory: React.FC<{ item: RenderHNStory }> = ({ item }) => {
  const userLink = `/user/${item.by}`
  const itemLink = `/item/${item.id}`
  const itemLinkText = item.descendants
    ? `${item.descendants} comments`
    : 'discuss'
  const time = getRelativeTime(item.time)

  return (
    <div className="px-4 mb-12">
      <ListItem>
        <ListItemTitle>
          <a target="_blank" rel="noopener noreferrer" href={item.url}>
            {item.title}
          </a>
        </ListItemTitle>
        <ListItemSubtitle>
          {item.score} points by{' '}
          <Link href="/user/[id]" as={userLink}>
            <a>{item.by} </a>
          </Link>
          {time} |{' '}
          <Link href="/item/[id]" as={itemLink}>
            <a>{itemLinkText}</a>
          </Link>
        </ListItemSubtitle>
      </ListItem>

      <form className="flex flex-col items-start pt-4">
        <textarea rows={6} cols={60} className="mb-4 text-sm max-w-full" />
        <button>add comment</button>
      </form>

      <ul className="list-none pl-0">
        {item.kids?.map(kid => (
          <li key={kid.id}>
            <ItemComment item={kid} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ItemStory
