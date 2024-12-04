# Phonebook Application

This is a simple phonebook application built with React. It allows users to add, edit, and delete contacts. The application uses a JSON server to simulate a backend API.

## Features

- Add new users with name and email.
- Edit existing users.
- Delete users.
- List all users.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   https://github.com/HosseinFarah/crud-react-json-server.git

2. Navigate to the project directory:
   cd phonebook
3. Install the dependencies:
   npm install
4. Start the JSON server:
npx json-server --watch db.json --port 3000
5. Start the development server:
   npm start
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

To add a new user, fill in the name and email fields and click "Add User".

To edit a user, click the edit button next to the user's details, update the information in the modal, and click "Save changes".

To delete a user, click the delete button next to the user's details and confirm the deletion.

## Dependencies

- React
- Axios
- JSON Server
- Bootstrap
