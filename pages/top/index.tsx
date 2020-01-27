import { NextPage } from 'next'
import { getTopStories, getItemById } from '~/api'
import ListItem, {
  ListItemTitle,
  ListItemSubtitle,
} from '~/components/ListItem'
import { HNStory, HNItem } from '~/types'
import Link from 'next/link'
import { connect, useSelector } from 'react-redux'
import { receiveItemsThunk, AppThunkAction } from '~/store/actions'
import { ThunkDispatch } from 'redux-thunk'
import { State } from '~/store'

interface TopPageProps {
  stories: Record<number, HNStory>
}

const TopPage: NextPage<TopPageProps> = ({ stories }) => {
  console.log('render')
  const storyList = Object.values(stories)
  return (
    <ol>
      {storyList.map(story => (
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

TopPage.getInitialProps = async ({ store }) => {
  const showStoryIds = await getTopStories()

  // const stories = await Promise.all(
  //   showStoryIds.slice(0, 10).map(id => getItemById<HNStory>(id)),
  // )

  // TODO: dispatch typings
  return store.dispatch<any>(receiveItemsThunk(showStoryIds))
}

export default connect((state: State) => ({
  stories: state.items as Record<number, HNStory>,
}))(TopPage)
