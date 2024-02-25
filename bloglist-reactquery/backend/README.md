git init

---01
# npm 6.x (outdated, but still used by some):
npm create vite@latest <project directory name> --template react
# npm 7+, extra double-dash is needed:
npm create vite@latest <project directory name> -- --template react

---02
cd <project directory name>
npm install

---03
npm run dev

---04 
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

---05
rm -rf node_modules/ && npm i

---06
npm install -g json-server
json-server --port 3001 --watch db.json
npx json-server --port 3001 --watch db.json

---07
npm install axios
npm install json-server --save-dev
npm run server

npm install axios
npm install json-server --save-dev

---08
create a backend app (part 3a)
npm init

---09
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

---4-a1
npm install express
npm update
npm install

const express = require('express')
const app = express()


---3-a3
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

---exercise 3.7
https://github.com/expressjs/morgan
npm install morgan
morgan(':method :url :status :res[content-length] - :response-time ms')


---12
npm install cors

const cors = require('cors')
app.use(cors())

---13
fly auth login
fly launch
fly deploy
fly open

---14
npm run build
app.use(express.static('dist'))

--14
npm install mongoose

const mongoose = require('mongoose')
const url =`mongodb+srv://${projectName}:${password}... ...`

mongoose.set('strictQuery',false)
mongoose.connect(url)
MONGODB_URI=address_here npm run dev

--15
npm install dotenv
fly secrets set MONGODB_URI='mongodb+srv://<projectName>:<password>... ...'

--16
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

--17
npm install mongoose@7.6.5

--18
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

---19
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

---4-b
npm install --save-dev cross-env
npm install cross-env

npm install --save-dev supertest

npm test -- tests/note_api.test.js
npm test -- -t "a specific note is within the returned notes"
npm test -- -t 'notes'

npm install express-async-errors
npm test -- tests/note_api.test.js

--- 4-b
npm install express-async-errors *introduce the library in app.js, before importing the routes:

--- 4-c
npm install mongoose-unique-validator
npm install mongoose@7.6.5

--- 4-d
npm install jsonwebtoken