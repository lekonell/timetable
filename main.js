const { app, BrowserWindow, Menu, Tray, dialog } = require('electron')

const dialogOptions = {
    type: 'info',
    buttons: ['ok'],
    defaultId: 1,
    title: 'info',
    message: 'test',
    detail: 'detail',
    checkboxChecked: false
}

function showDialog(dType, dTitle, dMessage, dDetail) {
    dialog.showMessageBox(null, {
        type: dType,
        title: dTitle,
        message: dMessage,
        detail: dDetail,
        checkboxChecked: false
    })
}

// showDialog('info', 'title', 'message', 'detail')

let win = null;
let tray = null;

function createWindow () {
    win = new BrowserWindow({
        minWidth: 480,
        width: 480,
        minHeight: 720,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        },
        transparent: false,
        frame: false,
        skipTaskbar: true,
        icon: 'img/icon.ico'
    })

    win.loadFile('index.html')

    /*
    win.on('show', () => {
        tray.setHighlightMode('always')
    })
    
    win.on('hide', () => {
        tray.setHighlightMode('never')
    })
    */
}

/*
{
    icon: './img/setting12.png',
    label: 'Settings',
    click: () => { app.quit(); },
},
*/
app.on('ready', () => {
    tray = new Tray('./img/icon.ico')
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '설정',
            click: () => { app.quit(); },
        },
        {
            label: '종료',
            click: () =>  { app.quit(); },
        }
    ])

    tray.setToolTip('timeTable')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        win.isVisible() ? win.hide() : win.show()
    })
})

app.whenReady().then(createWindow)

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})