import '../styles/home.css'
import { useState } from 'react'
import { Container, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reset, setExpansion, setInput, updateQuery } from '../app/querySlice'
import SearchIcon from '@mui/icons-material/Search'
import { toWords, toCheckList } from '../utils/queryUtils'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  dispatch(reset())
  const [text, setText] = useState('')
  const words = toWords(text)


  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(setInput(toCheckList(words, true)))
    window.api.send('query', words)
    window.api.receive('expansion', (expansion) => {
      dispatch(setExpansion(toCheckList(expansion, false)))
    })
    dispatch(updateQuery())
    navigate('/search')
  }
  return (
    <div className='home'>
      <Container maxWidth='md'>
        <div className='header'>
          <div className='logo'>
            <img src={require('../assets/images/logo_b.png')} alt='logo' />
          </div>
        </div>
        <div className='section'>
          <form onSubmit={onSubmit}>
            <div className='serach-bar'>
              <TextField
                fullWidth
                variant='outlined'
                autoComplete='off'
                name='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button variant='text' disableElevation type='submit'>
                      <SearchIcon />
                    </Button>
                  ),
                }}
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  )
}

export default Home
