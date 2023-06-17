# Multiple-Monitors-Chrome-Remote-Desktop

- machine-translated

[![ko](https://img.shields.io/badge/lang-ko--kr-green.svg)](https://github.com/nomomo/Multiple-Monitors-Chrome-Remote-Desktop/blob/main/README.md)

## Summary

**Multiple-Monitors-Chrome-Remote-Desktop** is a simple browser app based on Electron that allows you to run Chrome Remote Desktop across multiple monitors.

### Idea

Chrome Remote Desktop is a remote desktop tool available in the browser. Chrome Remote Desktop does not support multiple monitors by default.

If browsers could expand to span multiple monitors, then Chrome Remote Desktop would be able to span multiple monitors as well. However, there are limitations to resizing the window by dragging the window borders with the mouse. Therefore, **this app opens the browser in full windowed, frameless mode to cover the entire monitor**. (This app assumes that all monitors are positioned horizontally).

## How to use

- Download *Multiple-Monitors-Chrome-Remote-Desktop.x.x.x.zip* from the following link, where *x.x.x* corresponds to the app version. **Chrome browser may block the download of the file. Click the "Continue" button to download it.**
- Link to the download page: <https://github.com/nomomo/Multiple-Monitors-Chrome-Remote-Desktop/releases>
- Unzip the downloaded zip file.
- Run *Multiple-Monitors-Chrome-Remote-Desktop.exe*. **Windows Defender or antivirus program may block the app because it is not digitally signed. For antivirus programs, add the downloaded file to an exception; for Windows Depender, click "More info" and then click the Run button.**
- When you run the exe file, the browser opens across all monitors and connects to the Chrome Remote Desktop access page <https://remotedesktop.google.com/access>.
- To use keyboard shortcuts in Chrome Remote Desktop, such as Alt+Tab or Alt+F4, press the (>) button on the right after connecting remotely to open the menu, then click "Fullscreen". It may feel like nothing has changed, but if you press Alt+Tab, you should see the shortcut working within Remote Desktop.
- To quit the app, press Disconnect from the menu after connecting remotely, then press Alt+F4 to exit while the remote connection is closed.

## User settings

The first time you run the app, a settings.json file is created. You can modify the contents of this file with a text editor and then rerun the app for the changes to take effect.

```javascript
{
  "alwaysOnTop": true,      // Always display the app on top.
  "autoSizePos": true,      // true: Automatically determine the start position and size of the app. false: Launch the app with a user-specified start position and size.
  "startUrl": "https://remotedesktop.google.com/access",    // App start page
  "manualWidth": 3840,      // horizontal size of the app to apply if autoSizePos is false
  "manualHeight": 1080,     //  vertical size
  "manualPosX": 0,          // horizontal start position (relative to the main monitor)
  "manualPosY": 0,          // Vertical start position (relative to the main monitor)
}
```

## Notice

- This app does not collect and transmit your personal information.
- The developer is not responsible for any data loss or other issues that may occur due to program unresponsiveness/stretching while using this app (no issues have been reported).

## Q&A

### How is the size and position determined when the app is opened?

For the default settings, the app automatically determines the size and launch position of the app, assuming that all monitors are positioned horizontally.

- Horizontal size: The sum of the horizontal resolution values of all monitors.
- Vertical size: The smallest vertical resolution of any monitor
- Start position: top left of the leftmost monitor

Example:

- If Left: 1920x1080, Right: 1920x1080, the app opens at 3840x1080, centered on the top left of the leftmost monitor.
- If left: 1920x1080, right: 1080x1920 (pivoted monitors), the app opens at 3000x1080, centered on the top left of the leftmost monitor.
- If you have three 1920x1080 monitors arranged horizontally, the app will open at 5760x1080, centered on the top left of the leftmost monitor.

### My app opens at a weird size in a weird place

Manually specify the app's start position and size by setting autoSizePos in the settings.json file to false and entering the manualWidth, manualHeight, manualPosX, and manualPosY values manually.

### How should I enter manualPosX and manualPosY when manually entering the app's start position?

The top left corner of the monitor set as "Primary Monitor" in the OS's display settings is the starting position of the app when both manualPosX and manualPosY values are 0.

Example:

- If you have two 1920x1080 monitors and your primary monitor is the left monitor, you can enter 0 for manualWidth to have the window open on the left monitor.
- If you have two 1920x1080 monitors and your primary monitor is the right monitor, you can enter -1920 for manualWidth to have the window open on the left monitor.

### I currently have a triple monitor, but the PC I'm trying to remotely access has a dual monitor

Set autoSizePos to false in your settings.json file, and set manualWidth to the resolution of the PC you're remotely accessing.

Example:

- If your current PC uses three 1920x1080 resolution monitors, and the PC you're remotely accessing uses two 1920x1080 resolution monitors: Enter 3840 for manualWidth to launch the app to cover the two monitors on your current PC. The app's launch position is determined based on the "primary monitor". If the app doesn't launch on the desired monitor, enter -1920 for manualPosX to move the app to the left monitor, or 1920 to move the app to the right monitor.

### I have three monitors in a ㄱ-shape and the window size is weird

This is because the app assumes that all monitors are positioned horizontally. You need to set autoSizePos to false and manually specify the app size and start position.

Example:

- If you have three 1920x1080 monitors arranged in an A-shape, the app will open at 5760x1080 with the top left corner of the leftmost monitor.
- If you wanted the window to open at 3840x1080, you would set autoSizePos to false and specify manualWidth to 3840 and manualHeight to 1080.
- The starting position of the monitors is determined relative to the "primary monitor", so set the manualPosX and manualPosY values accordingly, or set the top left monitor as the "primary monitor".

### What about manual input when my monitor is not scaled to 100%?

If you are using a high-resolution monitor and the resolution scale is not 100%, and you want to manually enter the size and position of the app, use the following example to enter the values.

Example:

- If you are using a 3840x2160 resolution monitor at 125% scaling, the actual monitor resolution that the app recognizes is (3840/1.25)x(2160/1.25)=3072x1728.
- If you have two 3840x2160 resolution monitors laid out horizontally at 125% scaling and your primary monitor is the right monitor, you can run the app to cover all monitors by entering 6144 for manualWidth, 1728 for manualHeight, -3072 for manualPosX, and 0 for manualPosY.

### Why does the app ask me to sign in with Google?

When you run the app, you are directed to the Chrome Remote Desktop page (<https://remotedesktop.google.com/access>). You need to be signed in to Google to use Chrome Remote Desktop.

### I'm afraid I'll get hacked if I run the exe file...ugh.

If you know how to use Node.js, follow these steps to build it yourself

```bash
$ git clone https://github.com/nomomo/Multiple-Monitors-Chrome-Remote-Desktop.git
$ npm install
$ npm run build
```

## License

MIT

## Happy??

<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="60"></a>