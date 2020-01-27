import { NextPage } from 'next'
import { HNUser } from '~/types'
import { getUserById } from '~/api'

interface UserProps {
  user: HNUser
}

const User: NextPage<UserProps> = ({ user }) => {
  return (
    <div>
      <div>{user.id}</div>
      <div>{user.karma}</div>
    </div>
  )
}

User.getInitialProps = async ctx => {
  const { id } = ctx.query

  const user = await getUserById(id as string)

  return { user }
}

export default User
