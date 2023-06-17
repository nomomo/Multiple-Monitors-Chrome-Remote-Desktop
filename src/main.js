//const electronLocalshortcut = require('electron-localshortcut');
const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, screen, globalShortcut, dialog } = require('electron');

// Get the directory where the current executable is located
const executablePath = path.dirname(process.execPath);

// Construct the path to the settings file
const settingsFilePath = path.join(executablePath, 'settings.json');

// user settings
var userSettingsFromFile = {};
var userSettings = {
    alwaysOnTop: true,
    //replaceAltF4ToWinF4: false,
    autoSizePos: true,
    startUrl: "https://remotedesktop.google.com/access",
    autoSizePosComment: "If autoSizePos is true , the app automatically determines the window size and starting position. If you want to manually enter it, change autoSizePos to false and change the values of manualWidth, manualHeight, manualPosX, manualPosY to the desired values.",
    manualWidth: 3840,
    manualHeight: 1080,
    manualPosX: 0,
    manualPosY: 0
};

// Check if the settings file exists
if (fs.existsSync(settingsFilePath)) {
    // Read the contents of the settings file
    const fileData = fs.readFileSync(settingsFilePath, 'utf8');

    // Parse the JSON data
    try {
        // read file
        userSettingsFromFile = JSON.parse(fileData);

        let thereIsNewOption = false;
        // copy settings
        for(let key in userSettings){
            if(userSettingsFromFile[key] !== undefined){
                userSettings[key] = userSettingsFromFile[key];
            }
            else{
                thereIsNewOption = true;
            }
        }

        // if there is new option, re-write settings.json file
        if(thereIsNewOption){
            console.log("new options. re-write settings.json file");
            fs.writeFileSync(settingsFilePath, JSON.stringify(userSettings, null, 2));
        }
    } catch (error) {
        console.error('Error parsing settings file:', error);
    }

} else {
    // Write the default settings to the settings.json file
    try {
        console.log("write settings.json file");
        fs.writeFileSync(settingsFilePath, JSON.stringify(userSettings, null, 2));
    } catch (error) {
        console.error('Error creating settings file:', error);
    }
}

// create window
const createWindow = (x, y, width, height) => {
    const win = new BrowserWindow({
        width: width,
        height: height,
        frame: false,
        x: x,
        y: y,
        resizable: false,
        alwaysOnTop: userSettings.alwaysOnTop,
        enableLargerThanScreen: true, // for linux
        fullscreenable: false,
        kiosk: true
    });

    win.loadURL(userSettings.startUrl);
    win.setSize(width, height);

    // always on top with hyper-ultra-mega-powerful screen-saver mode
    if(userSettings.alwaysOnTop){
        win.setAlwaysOnTop(true, 'screen-saver');
    }

    // set icon on taskbar
    win.setIcon(path.join(__dirname, '../assets/icons/icon.ico'));

    // return
    return win;
};

// app ready
app.whenReady().then(() => {
    let win;
    let winWidth, winHeight, winPosX, winPosY;

    if(!userSettings.autoSizePos){
        // set user-defined pos and size of the app
        winWidth = userSettings.manualWidth;
        winHeight = userSettings.manualHeight;
        winPosX = userSettings.manualPosX;
        winPosY = userSettings.manualPosY;
    }
    else{
        // Calculate the total width and min height size across all monitors
        const displays = screen.getAllDisplays();
        let totalWidth = 0.0;
        let minHeight = 1.0e+12;
        displays.forEach((display) => {
            totalWidth += display.bounds.width;
            minHeight = Math.min(minHeight, display.bounds.height);
        });

        // Find the leftmost monitor position
        const leftmostDisplay = displays.reduce((leftmost, display) => {
            if (display.bounds.x < leftmost.bounds.x) {
                return display;
            }
            return leftmost;
        });
        const {
            x,
            y,
            width,
            height
        } = leftmostDisplay.bounds;
        //const { scaleFactor } = leftmostDisplay;
        
        winWidth = totalWidth;
        winHeight = minHeight;
        winPosX = x;
        winPosY = y;
    }

    console.log(winPosX, winPosY, winWidth, winHeight);

    // Create Electron window
    win = createWindow(winPosX, winPosY, winWidth, winHeight);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            win = createWindow(winPosX, winPosY, winWidth, winHeight);
        }
    });

    // function to exit
    const checkExitWithDialog = ()=>{
        // Show confirmation dialog
        const options = {
            type: 'question',
            buttons: ['Cancel', 'Exit'],
            defaultId: 1,
            message: 'Are you sure you want to exit?'
        };

        if(userSettings.alwaysOnTop){
            win.setAlwaysOnTop(false);
        }

        dialog.showMessageBox(win, options).then((response) => {
            if (response.response === 1) {
                // User confirmed, close the app
                app.quit();
            }
            else{
                if(userSettings.alwaysOnTop){
                    win.setAlwaysOnTop(true, 'screen-saver');
                }
            }
        });
    }

    // if(userSettings.replaceAltF4ToWinF4){
    //     win.webContents.on("before-input-event",(event,input)=>{ 
    //         if(input.code=='F4'&&input.alt){
    //             event.preventDefault();
    //         }
    //     });
        
    //     // Register the global shortcut
    //     const ret = globalShortcut.register('Super+F4', () => {
    //         checkExitWithDialog();
    //     });
    // }
    // else{
        win.webContents.on("before-input-event",(event,input)=>{ 
            if(input.code=='F4'&&input.alt){
                event.preventDefault();
                checkExitWithDialog();
            }
        });
    //}
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});