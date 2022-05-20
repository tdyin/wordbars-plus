const { app, BrowserWindow, ipcMain } = require('electron')
const { getSynonyms, removeWords } = require('../src/utils/naturalUtils')
const { getWikiKeywords } = require('../src/api/tldrService')
const { getSnippetsKeywords } = require('../src/api/serpService')
const path = require('path')
const isDev = require('electron-is-dev')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
  if (isDev) {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// get expansion from wikipedida, google search snippets, and wordnet
async function getExpansion(query) {
  const wiki = await getWikiKeywords(query)
  const snippets = await getSnippetsKeywords(query)
  const synonyms = await getSynonyms(query)
  return removeWords(query, [...snippets, ...wiki, ...synonyms])
}

// Send expansion to front-end
ipcMain.on('query', async (_event, query) => {
  const expansion = await getExpansion(query)
  win.webContents.send('expansion', expansion)
})
