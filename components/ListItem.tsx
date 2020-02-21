import React from 'react'

interface ListItemProps {
  index?: number
}
const ListItem: React.FC<ListItemProps> = ({ index, children }) => {
  let classes = 'relative'

  if (index) {
    classes += ' pl-10'
  }

  return (
    <div className={classes}>
      <div className="absolute left-0 top-0 pl-2 pt-1 text-xs text-gray-700">
        {index}
      </div>
      {children}
    </div>
  )
}

export const ListItemTitle: React.FC = ({ children }) => {
  return <div className="text-sm">{children}</div>
}

export const ListItemSubtitle: React.FC = ({ children }) => {
  return <small className="text-xs text-gray-700">{children}</small>
}

export default ListItem
