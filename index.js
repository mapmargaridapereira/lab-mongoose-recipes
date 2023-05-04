const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect("mongodb://127.0.0.1/exampleApp");
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);
    //Iteration 2
    // Create a recipe
    const newRecipes = await Recipe.create({
      title:"Orange and Milk-Braised Pork Carnitas",
      level:"UltraPro Chef", 
      ingredients:[
        "3 1/2 pounds boneless pork shoulder, cut into large pieces",
        "1 tablespoon freshly ground black pepper",
        "1 tablespoon kosher salt, or more to taste",
        "2 tablespoons vegetable oil",
        "2 bay leaves",
        "2 teaspoons ground cumin",
        "1 teaspoon dried oregano",
        "1/4 teaspoon cayenne pepper",
        "1 orange, juiced and zested"], 
        cuisine: "American", 
        dishType: "main_course", 
        image: "https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg",
        duration: 160, 
        creator: "Chef John"
      })
      console.log('Recipe created: ', newRecipes)

      //Iteration 3
      //Create many recipes
      const manyRecipes = await Recipe.insertMany(data);
      console.log("Created new Recipes:", manyRecipes);

      //Iteration 4
      //Updating rigatoni recipe
      const updatedRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}, {new: true});
      console.log("Recipe updated: ", updatedRecipe);

      //Iteration 5
      //Removing carrot cake
      const removeCake = await Recipe.deleteOne({title: "Carrot Cake"});
      console.log("Recipe removed: ", removeCake);


    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
