# File Uploader

A web application for securely uploading, storing, and organizing files in the cloud with folder management capabilities.

## Overview

File Uploader is a full-stack web application built with Node.js, Express, and PostgreSQL. It allows users to upload files to Cloudinary and organize them in a customizable folder structure. The application features user authentication, nested folders, and secure file management.

## Features

- **User Authentication**: Secure signup and login functionality
- **File Management**: Upload, download, and delete files
- **Folder Organization**: Create, edit, and delete folders
- **Nested Folders**: Organize files in a hierarchical structure
- **Cloud Storage**: Files stored on Cloudinary for reliable access
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with local strategy
- **File Storage**: Cloudinary
- **Frontend**: EJS templating, CSS
- **Security**: bcrypt for password hashing

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/JoseVS1/file-uploader
   cd file-uploader
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/fileuploader"
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   SECRET=your_session_secret
   PORT=3000
   ```

4. Set up the database using Prisma:
   ```
   npx prisma migrate dev --name init
   ```

5. Start the server:
   ```
   npm start
   ```

## Project Structure

```
├── config
│   ├── cloudinary.js
│   └── passport.js
├── controllers
│   ├── fileController.js
│   ├── folderController.js
│   └── indexController.js
├── lib
│   ├── authMiddleware.js
│   ├── formatBytes.js
│   └── passwordUtils.js
├── prisma
│   └── schema.prisma
├── public
│   └── styles.css
├── routes
│   ├── fileRouter.js
│   ├── folderRouter.js
│   └── indexRouter.js
└── app.js
```

## Usage

### Authentication

1. Sign up with a username, email, and password
2. Log in with your credentials
3. Access your file storage dashboard

### File Management

- Upload files from your device
- View file details including size and type
- Download files when needed
- Delete files you no longer need

### Folder Organization

- Create folders to organize your files
- Create nested folders for hierarchical organization
- Edit folder names
- Delete folders and their contents

## API Endpoints

### Index Routes

- `GET /` - Home page (requires authentication)
- `GET /sign-up` - Sign up page
- `POST /sign-up` - Create a new user
- `GET /log-in` - Login page
- `POST /log-in` - Authenticate user
- `GET /log-out` - Log out user

### File Routes

- `GET /file/:id` - View file details
- `POST /file/upload` - Upload a new file
- `DELETE /file/:id` - Delete a file

### Folder Routes

- `GET /folder/:id` - View folder contents
- `POST /folder/create` - Create a new folder
- `PUT /folder/:id` - Update folder name
- `DELETE /folder/:id` - Delete folder
- `POST /folder/:id/createFolder` - Create a nested folder
- `POST /folder/:id` - Upload a file to a folder

## Security

- Passwords are hashed using bcrypt
- Session data is stored securely in the database
- File access is restricted to authenticated users
- Authentication middleware protects routes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Cloudinary](https://cloudinary.com/)
- [Passport.js](http://www.passportjs.org/)
