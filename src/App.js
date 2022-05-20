import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#bdbdbd',
    }
  },
});

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Dashboard />} />
          </Routes>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
