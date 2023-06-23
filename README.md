# CClL-2-YouMeChampion

Welcome to my page I made for the studie course BCC. It is a page for League of Legends players to make new friends and find new champions to play. It is built using Vue, Vite, Node.js, Express, Tailwind CSS, DaisyUI, and Axios.

## Features
### Pages
  - Home
      - Here the user sees the latest news and a welcome message
      - Once logged in they also see their friendlist and their selected champions
  - Champions
      - Here is a list of all the current League of Legends champions
      - once logged in the user sees his selected champions
  - Chat
      - Here users can chat in public chat-rooms
      - Once logged in the user sees their friendlist with a chat button to directly chat with them
  - Login/Register
      - Users can login or register here incase they don't have an account yet
  - Users
      - Here is a list of all registered users
      - Once you are logged in the user also sees their friendlist and in the user-list there is a button to add friends
  - Profile
      - Here you can only come after logging in
      - The user sees their friendlist and their selected champions
      - The user can edit their profile here for more personalisation

## Get Started
  1. Clone this repository
  2. `cd front` && `cd back` in seperate terminals
  3. Install dependencies: npm install in both terminals
  4. In the database.js make sure to change:
    host: `"YOUR HOST NAME HERE" port: YOUR PORT HERE, database: "YOUR DATABASE NAME HERE"`
  5. Create an .env file in "Backend" which holds:
     `DB_USERNAME="YOUR DB USERNAME HERE" DB_PASSWORD="YOUR DB PASSWORD HERE" ACCESS_TOKEN_SECRET="YOUR ENCODED SECRET BY BCRYPT HERE"`
  6. The localhost for the backend is currently set to 3000
  7. Run the development server: npm run dev in both terminals
  8. Open your browser and visit http://localhost:5173 to access the webpage.
