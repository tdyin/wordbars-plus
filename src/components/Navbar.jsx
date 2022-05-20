import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Box, Toolbar, styled, alpha, InputBase } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search'
import { setExpansion, setInput, updateQuery } from '../app/querySlice'
import { toWords, toCheckList } from '../utils/queryUtils'

function Navbar() {
  const dispatch = useDispatch()
  const { query } = useSelector((state) => state.query)

  const [text, setText] = useState(query.join(' '))

  const words = toWords(text)

  useEffect(() => {
    setText(query.join(' '))
  }, [query])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(setInput(toCheckList(words, true)))
    window.api.send('query', words)
    window.api.receive('expansion', (expansion) => {
      dispatch(setExpansion(toCheckList(expansion, false)))
    })
    dispatch(updateQuery())
  }

  return (
    <Box>
      <AppBar position='static'>
        <Toolbar>
          <Link to={'/'}>
            <img
              style={{ width: '150px', marginRight: '10px' }}
              src={require('../assets/images/logo_w.png')}
              alt='logo'
            />
          </Link>
          <form onSubmit={onSubmit}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                inputProps={{
                  value: text,
                  onChange: (e) => setText(e.target.value),
                }}
              />
            </Search>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '60ch',
    },
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default Navbar
