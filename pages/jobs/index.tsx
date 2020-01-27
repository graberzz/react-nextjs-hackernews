import { NextPage } from 'next'
import { HNJob } from '~/types'
import ListItem, {
  ListItemTitle,
  ListItemSubtitle,
} from '~/components/ListItem'
import { getJobStories, getItemById } from '~/api'

interface JobsPageProps {
  jobs: HNJob[]
}

const JobsPage: NextPage<JobsPageProps> = ({ jobs }) => {
  return (
    <ol>
      {jobs.map(job => (
        <li key={job.id}>
          <ListItem>
            <ListItemTitle>
              <a target="_blank" rel="noopener noreferrer" href={job.url}>
                {job.title}
              </a>
            </ListItemTitle>
            <ListItemSubtitle>
              {new Date(job.time * 1000).toTimeString()} |{' '}
            </ListItemSubtitle>
          </ListItem>
        </li>
      ))}
    </ol>
  )
}

JobsPage.getInitialProps = async () => {
  const jobIds = await getJobStories()
  const jobs = await Promise.all(jobIds.map(id => getItemById<HNJob>(id)))

  return { jobs }
}

export default JobsPage
