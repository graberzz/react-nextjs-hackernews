import { useEffect, useState, ReactNode } from 'react'
import { getItemById } from '~/api'
import { HNComment } from '~/types'

interface CommentProps {
  id: string | number
}

const Comment: React.FC<CommentProps> = ({ id }) => {
  const [comment, setComment] = useState()

  useEffect(() => {
    const fetchComment = async (): Promise<void> => {
      const item = await getItemById<HNComment>(id)
      setComment(item)
    }

    fetchComment()
  }, [id])

  const renderKids = (): ReactNode =>
    (comment?.kids || []).map((id: string) => <Comment key={id} id={id} />)

  return (
    <div style={{ border: '1px solid gray' }}>
      {comment ? (
        <div
          data-testid="text"
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      ) : (
        'Loading...'
      )}
      <div style={{ paddingLeft: 10 }}>{renderKids()}</div>
    </div>
  )
}

export default Comment
