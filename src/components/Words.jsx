import React from 'react'
import Word from './Word'
import { List, ListSubheader, Divider } from '@mui/material'
import { useSelector } from 'react-redux'

function Words() {
  const { input, expansion } = useSelector((state) => state.query)
  return (
    <div style={{ height: '100%', overflowY: 'scroll' }}>
      {input[0].value !== '' ? (
        <div>
          <List subheader={<ListSubheader>Original</ListSubheader>}>
            <Divider />
            {input.map((word, index) => (
              <Word key={index} index={index} word={word} type={'input'} />
            ))}
          </List>
          <List subheader={<ListSubheader>Expansion</ListSubheader>}>
          <Divider />
            {expansion.map((word, index) => (
              <Word key={index} index={index} word={word} type={'expansion'} />
            ))}
          </List>
        </div>
      ) : (
        <p>No words</p>
      )}
    </div>
  )
}

export default Words
