import React from 'react'

const ListItem: React.FC = ({ children }) => {
  return <div>{children}</div>
}

export const ListItemTitle: React.FC = ({ children }) => {
  return <div className="text-sm">{children}</div>
}

export const ListItemSubtitle: React.FC = ({ children }) => {
  return <small className="text-xs text-bl">{children}</small>
}

export default ListItem
