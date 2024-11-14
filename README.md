# JS-FileTransferApp
### Motivation?
Applying knowledge from university courses; and also because internship hunting is cooked.
### Website Color Palette

<div style="display: flex; justify-content: center;">
  <div style="background-color: #D3E0E6; width: 50px; height: 50px; margin-right: 10px;"></div>
  <div style="background-color: #6F7D95; width: 50px; height: 50px; margin-right: 10px;"></div>
  <div style="background-color: #2B3A55; width: 50px; height: 50px; margin-right: 10px;"></div>
  <div style="background-color: #87A8A2; width: 50px; height: 50px; margin-right: 10px;"></div>
  <div style="background-color: #D6D2C4; width: 50px; height: 50px; margin-right: 10px;"></div>
</div>

## Dependencies 
- Express; routing and server-side logic
- Mongoose; integrating MongoDB database
- Multer;  to handle file uploads [to be expanded]
- EJS; templating language [Might use tailwind + react for front-end]
- Bcrypt; hashing password for security. [to be expanded]

## Pending Features
- Allow users to generate a unique code which contains files.
- When this code is entered the file transferred from one machine to another.
- Allow users to send bulk files in folders, create folder instances.
- Personalise user files by allowing them to create accounts which contains file they sent and their recent transfers.
- Show information of their participated recent transfer. Have UI to show the type of device used, name of device and public I.P?

## Development Commands
If starting fresh, run two terminals:
1) Terminal A: cd back-end -> npm install.
2) Terminal B: cd front-end -> npm install.

Starting the server: 
- npm run devStart

Starting the front-end: 
- npm run dev



