# Safe Travels 
### *A Travel App With Your Safety In Mind*

### About the App
Safe Travels is a next-generation travel app intended for safety-conscious travelers - eg. parents travelling with children, tourists wanting to know places to avoid that will compromise their safety or personal property.

### Motivation 
Our team's motivation was to create an app that's unique, useful and change how people travel. A typical travel app/site concentrates only on scheduling/booking flights, hotel reservations and car rentals. Our travel app provides the user the ability to make better decisions when it comes to choosing where to stay and places to visit by displaying displaying not only hotel choices but also crime data represented by a heat map. Green areas represent some crime activity while red represent serious crime activity. By displaying this information, we feel that it will give the traveler the peace of mind they need when visiting a new, unknown place.

### Instructions
For a new user 
1. Create a new account 
2. After successful creation of new account, user is taken to the search page
3. Enter the city, start date and end date of your travel
4. A google map is shown below the search bar
  * Hotels are rendered as pins
    * Click on any pin to see hotel info - name, address, rating
    * Click on the bookmark button to save the hotel in yout hotel bookmark
  * Crime data is rendered as a heat map - red areas are the places you want to keep in your radar as places to avoid (if you can) 
  * Past searches are shown on the side panel - the google map can be re-rendered (to show updated crime heat map) by clicking on the name of the city 
5. User can also navigate to the Account Manager page to view or delete Bookmarked Hotels and Search History.


### Demo

![Safe Travels Demo](public/assets/images/Safe_Travels_Demo_720p.mp4)

### Use the App

[Safe Travels App](https://gentle-cliffs-96233.herokuapp.com/search)


### Front End Tech
* HTML5
* CSS3
* Bootstrap
* Javascript, jQuery

### Back End Tech
* Node.js
* Express.js, Express Router, Middleware
* Handlebars
* Sequelize, MySQL
* Node Rest Client

### APIs Used
* [spotcrime](https://www.npmjs.com/package/spotcrime)
* [bcrypt](https://www.npmjs.com/package/bcrypt)
* [Google Places, Google Maps, Google Visualization Library](https://developers.google.com/maps/)
* [Geobytes](http://geobytes.com/free-ajax-cities-jsonp-api/)


### Project Contributors
* Justin Wong - [jwong1219](https://github.com/jwong1219)
* Winfred Sunga - [winfredSunga-jw0226](https://github.com/winfredSunga-jw0226)
* Emily Lau - [emilylau5](https://github.com/emilylau5)
* Maxwilliam Chao - [maxwilliamchao](https://github.com/maxwilliamchao)

