const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: "./images/icon.png"
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

// Menu
const { Menu } = require('electron');

const template = [
    {
        role: 'help',
        submenu: [
            {
                label: 'Code on GitHub',
                click: async () => {
                    const { shell } = require('electron')
                    await shell.openExternal('https://github.com/pperezp/pomodoro-js')
                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);