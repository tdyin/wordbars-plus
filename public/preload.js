const { contextBridge, ipcRenderer } = require('electron')

// Front-end and back-end exchange data here
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) => {
    ipcRenderer.on(channel, (_event, ...args) => func(...args))
  },
})
