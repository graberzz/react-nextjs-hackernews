import { NextPage } from 'next'
import { HNUser } from '~/types'
import { getUserById } from '~/api'
import { DateTime } from 'luxon'

interface UserProps {
  user: HNUser
}

const User: NextPage<UserProps> = ({ user }) => {
  const createdDate = DateTime.fromMillis(user.created).toLocaleString(
    DateTime.DATE_MED,
  )

  return (
    <table>
      <tbody>
        <tr>
          <td>user</td>
          <td>{user.id}</td>
        </tr>
        <tr>
          <td>created</td>
          <td>{createdDate}</td>
        </tr>
        <tr>
          <td>karma</td>
          <td>{user.karma}</td>
        </tr>
        <tr>
          <td>about</td>
          <td dangerouslySetInnerHTML={{ __html: user.about }} />
        </tr>
      </tbody>
    </table>
  )
}

User.getInitialProps = async ({ query, store }) => {
  // TODO: move to Redux
  const user = await getUserById(query.id as string)
  return { user }
}

export default User
