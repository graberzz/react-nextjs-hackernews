import { NextPage } from 'next'
import { getShowStories, getItemById } from '~/api'
import ListItem, {
  ListItemTitle,
  ListItemSubtitle,
} from '~/components/ListItem'
import { HNStory } from '~/types'
import Link from 'next/link'

interface ShowPageProps {
  showStories: HNStory[]
}

const ShowPage: NextPage<ShowPageProps> = ({ showStories }) => {
  return (
    <ol>
      {showStories.map(story => (
        <li key={story.id}>
          <ListItem>
            <ListItemTitle>
              <a target="_blank" rel="noopener noreferrer" href={story.url}>
                {story.title}
              </a>
            </ListItemTitle>
            <ListItemSubtitle>
              {story.score} points by{' '}
              <Link href={`/user/${story.by}`}>
                <a>{story.by} </a>
              </Link>
              {new Date(story.time * 1000).toTimeString()} |{' '}
              <Link href={`/item/${story.id}`}>
                <a>{story.descendants} comments</a>
              </Link>
            </ListItemSubtitle>
          </ListItem>
        </li>
      ))}
    </ol>
  )
}

ShowPage.getInitialProps = async () => {
  const showStoryIds = await getShowStories()

  const showStories = await Promise.all(
    showStoryIds.map(async id => {
      const showStory = await getItemById<HNStory>(id)

      return showStory
    }),
  )

  return { showStories }
}

export default ShowPage
