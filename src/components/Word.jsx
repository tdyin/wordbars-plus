import { useState, useEffect } from 'react'
import {
  Checkbox,
  ListItemIcon,
  ListItemButton,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { useDispatch } from 'react-redux'
import { updateChecks, updateQuery } from '../app/querySlice'

function Word({ index, word, type }) {
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(word.checked)

  useEffect(() => {
    dispatch(
      updateChecks({
        index: index,
        type: type,
        check: checked,
      })
    )
    dispatch(updateQuery())
  }, [index, type, checked, dispatch])

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton dense onClick={() => setChecked(!checked)}>
          <ListItemIcon>
            <Checkbox edge='start' checked={checked} disableRipple />
          </ListItemIcon>
          <ListItemText primary={`${word.value}`} />
        </ListItemButton>
      </ListItem>
      <Divider />
    </>
  )
}

export default Word
