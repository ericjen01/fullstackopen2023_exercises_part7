--- 1-a Create React App
    npm create vite@latest <project directory name> --template react

    cd <project directory name>
    npm install

    npm run dev

--- 1-a Component
    index.js/main.jsx:
    import ReactDOM from 'react-dom/client'
    import App from './App'
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)

    App.jsx:
    const App = () => {
      return (
        <div>
          <p>Hello world</p>
        </div>
      )
    }
    export default App

--- 1-d Exercises 1.6.-1.14
    rm -rf node_modules/ && npm i

--- 2-c Getting Data From Server
    npm install -g json-server
    json-server --port 3001 --watch db.json
    npx json-server --port 3001 --watch db.json

--- 2-c Axios and Promises
    npm install axios
    npm install json-server --save-dev
    npm run server

    npm install axios
    npm install json-server --save-dev

--- 3-a Create a Backend App
    npm init

--- 3-a Simple Web Server
    {
      // ...
      "scripts": {

        "start": "node index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      // ...
    }

    node index.js
    npm start

--- 3-a Express
    npm install express
    
    npm update
    npm install

    const express = require('express')
    const app = express()


--- 3-a Nodemon
    npm install --save-dev nodemon
    node_modules/.bin/nodemon index.js

    {
      // ..
      "scripts": {
        "start": "node index.js",

        "dev": "nodemon index.js",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      // ..
    }

    npm run dev

--- exercise 3.7
    https://github.com/expressjs/morgan
    npm install morgan
    morgan(':method :url :status :res[content-length] - :response-time ms')


--- 3-b Same Origin Policy & Cors
    npm install cors

    const cors = require('cors')
    app.use(cors())

--- 3-b Application to The Internet
    fly auth login
    fly launch
    fly deploy
    fly open

--- 3-b Frontend Production build
    npm run build
    app.use(express.static('dist'))

--- 3-c MongoDB
    npm install mongoose

    const mongoose = require('mongoose')
    const url =`mongodb+srv://${projectName}:${password}... ...`

    mongoose.set('strictQuery',false)
    mongoose.connect(url)
    MONGODB_URI=address_here npm run dev

--- 3-c Database Config into Its Module
    npm install dotenv
    fly secrets set MONGODB_URI='mongodb+srv://<projectName>:<password>... ...'

--- 3d Lint
    npm install eslint --save-dev
    npx eslint --init
    'env': {
            'commonjs': true,
            'es2021': true,
            'node': true
        },
      'rules': {
            'indent': [
                'error',
                2
            ],
            'linebreak-style': [
                'error',
                'unix'
            ],
            'quotes': [
                'error',
                'single'
            ],
            'semi': [
                'error',
                'never'
            ]
        }

        npx eslint index.js

        "scripts": {
            "lint": "eslint ."
        },

        npm run lint

--- 4-a Project Structure
    ├── index.js
    ├── app.js
    ├── dist
    │   └── ...
    ├── controllers
    │   └── notes.js
    ├── models
    │   └── note.js
    ├── package-lock.json
    ├── package.json
    ├── utils
    │   ├── config.js
    │   ├── logger.js
    │   └── middleware.js  

--- 4-a Exercises 4.1-4.2
    npm install mongoose@7.6.5

--- 4-a Testing Node Applications
    npm install --save-dev jest

    "scripts": {
      ...
      "test": "jest --verbose"
    },
    "jest": {
      "testEnvironment": "node"
    }

    npm script test
    npm test

--- 4-b Testing Enviroment
    npm install --save-dev cross-env
    npm install cross-env

    npm install --save-dev supertest

    npm test -- tests/note_api.test.js
    npm test -- -t "a specific note is within the returned notes"
    npm test -- -t 'notes'

    npm install express-async-errors
    npm test -- tests/note_api.test.js

--- 4-b Eliminating The Try-Catch
    npm install express-async-errors *introduce the library in app.js, before importing the routes:

--- 4-c Creating Users
    npm install mongoose-unique-validator
    npm install mongoose@7.6.5

--- 4-d Limiting Creating New Notes to Logged-in Users
    npm install jsonwebtoken

    ---------------------------------------
    React eslint error missing in props validation
      /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
    OR
      "rules": {
      "react/prop-types": "off"
      }

--- 5-b Prop-Types Package
    npm install prop-types

--- 5-b ESlint For The Frontend
    npm install --save-dev eslint-plugin-jest

    create .eslintrc.cjs 

    create .eslintignore with the following contents to the repository root

    npm run lint

--- 5-c Testing React App Frontend

    npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @babel/preset-env @babel/preset-react

    in package.json:
      {
        "scripts": {
          // ...
          "test": "jest"
        }
        // ...
        "jest": {
          "testEnvironment": "jsdom"
        }
      }

    for .babelrc:
      {
        "presets": [
          "@babel/preset-env",
          ["@babel/preset-react", { "runtime": "automatic" }]
        ]
      }

    Clicking buttons in tests
    npm install --save-dev @testing-library/user-event

--- 5-d Cypress

    npm install --save-dev cypress
      "scripts": {
        "dev": "vite --host",
        "cypress:open": "cypress open"

    npm run cypress:open

    add an npm script to the backend
      "scripts": {
          "start:test": "NODE_ENV=test node index.js",

    Cy error fix:
      npm install eslint-plugin-cypress --save-dev

      change configuration in .eslintrc.cjs:

      module.exports = {
      "env": {
        "cypress/globals": true
      "plugins": [
          "react", "jest", "cypress"
      ],
      }
    }

    Controlling the state of the database

      if (process.env.NODE_ENV === 'test'){...}

      npm run start:test

      backend:

        npm install --save-dev cross-env

        "scripts": {
          "start": "cross-env  NODE_ENV=production node index.js",
          "dev": "cross-env  NODE_ENV=development nodemon index.js",
          "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
          "lint": "eslint .",
          "start:test": "cross-env NODE_ENV=test node index.js"
        },

        .env
          TEST_MONGODB_URI=mongodb+srv://fullstack:<password>@cluster0.o1opl.mongodb.net/TestBlogApp
          ?retryWrites=true&w=majority

        config.js
          require('dotenv').config()
          const PORT = process.env.PORT
          const MONGODB_URI = process.env.NODE_ENV === 'test'
            ? process.env.TEST_MONGODB_URI
            : process.env.MONGODB_URI

--- 6-a Redux
    npm install redux

    cd unicafe-redux   // go to the directory of cloned repository
    rm -rf .git
    npm install

--- 6-b Redux Toolkit
    npm install @reduxjs/toolkit

--- 7-a React Router
    npm install react-router-dom

    import {
      BrowserRouter as Router,
      Routes, Route, Link
    } from 'react-router-dom'
    
   return(
    <Router>
      <Routes>
        <Route path="/" element={<AnecdoteList  anecdotes ={anecdotes} />} />
      </Routes>
    </Router>
  )


-----------------------------------------------------------------------
Navigate to the local project directory and create a local git repository:

git init

Once that is successful, click on the 'Source Control' icon on the left navbar in VS-Code.One should be able to see files ready to be commit-ed. Press on 'Commit' button, provide comments, stage the changes and commit the files. Alternatively you can run from CLI

git commit -am "Your comment"

Now you need to visit your GitHub account and create a new Repository. Exclude creating 'README.md', '.gitIgnore' files. Also do not add any License to the repo. Sometimes these settings cause issue while pushing in.

Copy the link to this newly created GitHub Repository.

Come back to the terminal in VS-CODE and type these commands in succession:

git remote add origin <Link to GitHub Repo> //maps the remote repo link to local git repo

if you get an error message 'fatal: Could not read from remote repository' -> 
change your ssh url by an http url for your remote 'origin', use:

> git remote set-url origin https://github.com/<user_name>/<repo_name>.git

Please make sure you have the correct access rights
and the repository exists

git remote -v //this is to verify the link to the remote repo

git push -u origin master // pushes the commit-ed changes into the remote repo

Note: If it is the first time the local git account is trying to connect to GitHub, you may be required to enter credentials to GitHub in a separate window.

You can see the success message in the Terminal. You can also verify by refreshing the GitHub repo online.    


----------------------------------------------------------------------
** [vite] hmr invalidate /src/main.jsx Could not Fast Refresh
     If you are using .jsx files, you should modify the vite.config.js:

        plugins: [react({
          // Add this line
          include: "**/*.jsx",
        })]
    
    Or, if you are using typescript (.tsx), you can modify the vite.config.js:

        plugins: [react({
          // Add this line
          include: "**/*.tsx",
        })]

Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders.

A non-serializable value was detected in an action, in the path....
  returning the entire Axios response object from async thunks can cause error. That includes some of the Axios config setup. Don't do that

  Instead, just return response.data

--- React Router: Cannot read property 'pathname' of undefined
    try to import the following on files suspected
    import { BrowserRouter as Router } from "react-router-dom"

--- React eslint error missing in props validation
    Consider just disabling this rule until the bugs are worked out or you've upgraded your tooling:
    /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
    Or disable project-wide in your eslintrc:

    "rules": {
      "react/prop-types": "off"
    }
