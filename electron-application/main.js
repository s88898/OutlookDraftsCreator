const { app, BrowserWindow } = require('electron');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadURL('data:text/html,<h1>Electron app running</h1>');
}

app.whenReady().then(() => {
  console.log("electron");
  createWindow();

  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (parsedUrl.pathname === '/open') {
      const filePath = parsedUrl.query.file;

      if (!filePath) {
        res.writeHead(400);
        res.end('Missing "file" parameter');
        return;
      }

      const fileExists = fs.existsSync(filePath);
      const isEML = path.extname(filePath).toLowerCase() === '.eml';

      if (!fileExists) {
        res.writeHead(404);
        res.end('File does not exist');
        return;
      }

      if (!isEML) {
        res.writeHead(400);
        res.end('File must be a .eml file');
        return;
      }

      console.log('Valid file path:', filePath);

      const outlookPath = `"C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE"`;

      exec(`${outlookPath} "${filePath}"`, (error, stdout, stderr) => {
        if (error) {
          console.error('Failed to open Outlook:', error);
          res.writeHead(500);
          res.end('Failed to open file in Outlook');
          return;
        }

        console.log('Outlook opened with file:', filePath);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Outlook opened with file: ${filePath}`);
      });

    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  server.listen(4567, () => {
    console.log('Server listening on port 4567');
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
