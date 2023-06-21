// Importing required modules from electron
const { app, BrowserWindow } = require("electron");
// importin path
const path = require("path");
let mainWindow;
// create window function
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  const appUrl = "http://localhost:3000";
  mainWindow.loadURL(appUrl);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
