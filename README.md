# OutlookDraftsCreator
A web application that creates and opens email drafts in Outlook quickly and conveniently.

📧 Email Form Generator with EML Export & Outlook Integration
🔍 What This App Does
This is an interactive React application that allows users to compose emails, attach PDF or DOCX resumes, and generate .eml files for each recipient. These .eml files are automatically downloaded and can be opened in Microsoft Outlook via a local Electron backend.

⚙️ Technologies Used
Frontend:

React (Hooks: useState, useRef)

Material UI (@mui/material)

Backend:

Electron (Node.js, BrowserWindow, local HTTP server)

Languages:

JavaScript (ES6+)

HTML

Node.js

📦 Features
Dynamic email form with multiple recipients

Real-time email validation

File upload (PDF or Word)

.eml file generation with MIME formatting

Automatic download of each generated file

Integration with Microsoft Outlook (opens each file via Electron)

🖥️ Prerequisites
To run this application, make sure you have:

Node.js (v14 or higher)

npm or yarn

Electron installed and configured in the project

Windows OS with Microsoft Outlook installed

Tested with: Outlook 2016 / Office 365

A modern browser (e.g., Chrome, Edge) with Blob download support

🛠️ Getting Started
Clone the repo and install dependencies:

bash
Copy
Edit
git clone https://github.com/your-repo/email-eml-generator.git
cd email-eml-generator
npm install
npm start
In a separate terminal, launch the Electron backend:

bash
Copy
Edit
npm run electron
⚠️ Make sure Outlook is installed at the path:
"C:\\Program Files (x86)\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE"
You can change this in the Electron script if needed.

📁 Project Structure
EmailForm.jsx – React component for the email input form

emlGenerator.jsx – Functions for generating and downloading .eml files

electron.js – Local HTTP server that opens .eml files in Outlook

🧪 How to Use
Fill in recipient emails, subject, and body

Upload a PDF or DOCX resume

Click "Send"

.eml files will be saved in your Downloads folder and opened automatically in Outlook


