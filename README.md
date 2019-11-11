# Lego Minifigure Collector
## A full-stack CRUD app that allows you to track your Lego Minifigure Collection
---
### **Live site:**
#### https://minifigure-collector.herokuapp.com/
---
#### **Technologies Used:**
- HTML
- CSS
- Bootstrap
- Node.js
- MongoDB
- Mongoose
- Express
- EJS, EJS Partials
- Bcrypt
---
## **App Functions:**

- Browse the full Lego Minifigure library, either by Series or by viewing the whole library
- Signup/Login to create your own Lego collection 
- Add legos from full Lego Minifigure library or by Series
- Create a new Lego suggestion by naming it and choosing the gender and mood - separated by User
---
### Approach Taken
All Minifigures are saved to a main database that can be browsed without being signed in.  Once the user signs up and logs in, they can begin their own collection.  Every time a user clicks "Add to My Collection" all data is copied from the Lego object to a Saved Lego object.  Each Saved Lego object has a username assigned to it.  There are different versions of pages based on whether or not you're logged in.  The app checks if you're logged in, and uses an if loop to decide which version of the page to load.  There's also a create Lego page where you can choose gender and mood, and name the lego, and it will be added to a separate Created collection.
