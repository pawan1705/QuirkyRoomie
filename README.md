# QuirkyRoomie
## Installation Steps:
1. Install nodejs and npm on your device.
2. Clone the repository to your local system.
3. In the root folder, create a '.env' file.
4. Create a MongoDB server and get the MongoDB URI.
5. Add env variables as "MONGO_URI" to the .env file
6. Add a PORT variable and JWT_SECRET variable too.
7. Set PORT = 3020
8. Set JWT_SECRET as a string of your choice.
## Steps to run the project
1. Open up the command terminal from the root directory and type `npm start` to start the backend server.
2. Open another command prompt and type the following to start the frontend.  
`cd clint`  
`npm run dev`
3. The application would be run on http://127.0.0.1:5173/
4. An admin user will be created in the database  
    Email : applatus.pawan@gmail.com  
    Password: sangare
## List of implemented features
* Register and Login User
* Users can only register with  email id
* List of Users with their information
* Users can file complaint with different-different category and types
* Users (Flatmates) are capable to show all complaint
* Flatemates can Upvote and Downvote complaints.
* Complaint with the most upvotes becomes "Flatmate Problem of the Week."
* Users can mark complaints as resolved.
* Displays who has the most complaints filed .
* Shows top complaint categories for the flat.
## List of planned features
* User authentication 
* Better and responsive UI
## List of known bugs
* The pagination only lets the filter to apply on the current Gyans being rendered on the page.
* On smaller screen, the UI breaks
## References
* Stack Overflow
* Tailwind CSS docs
* W3School
* Mongoose JS docs
* Medium articles
