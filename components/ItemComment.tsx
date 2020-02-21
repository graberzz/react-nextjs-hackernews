import { useState } from 'react'
import Link from 'next/link'
import { RenderHNComment } from '~/types'

interface CommentProps {
  item: RenderHNComment
}

const ItemComment: React.FC<CommentProps> = ({ item }) => {
  const [isFolded, setIsFolded] = useState(false)
  function toggleFolding(): void {
    setIsFolded(!isFolded)
  }

  function calculateKidsCount(item: RenderHNComment): number {
    let count = item.kids?.length ?? 0
    count += item.kids?.reduce((c, k) => c + calculateKidsCount(k), 0) ?? 0
    return count
  }

  const userName = item.by
  const userLink = `/user/${item.by}`
  const kidsCount = calculateKidsCount(item)
  const shouldBeFoldable = kidsCount > 2
  const shouldRenderKids = !!item.kids
  const commentText = item.text

  return (
    <div>
      <div className="text-2xs text-gray-500">
        <Link href="/user/[id]" as={userLink}>
          <a>{userName}</a>
        </Link>

        {shouldBeFoldable && (
          <button
            className="bg-background border-none"
            data-testid="item-comment-fold-button"
            onClick={toggleFolding}
          >
            {isFolded ? `[+${kidsCount}]` : '[-]'}
          </button>
        )}
      </div>

      <div hidden={isFolded} className="text-xs">
        <div
          className="mb-2 break-words"
          data-testid="item-comment-text"
          dangerouslySetInnerHTML={{
            __html: commentText,
          }}
        />

        {shouldRenderKids && (
          <ul className="list-none">
            {item.kids?.map(kid => (
              <li key={kid.id}>
                <ItemComment item={kid} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ItemComment
