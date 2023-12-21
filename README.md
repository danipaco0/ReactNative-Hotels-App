# ReactNative-Hotels-App

Welcome to the **ReactNative-Hotels-App**, a mobile application built using React Native. This app is designed to provide a hotel browser.

## Features

- **Hotel Browsing**: Explore a variety of hotels with detailed information.
- **Favorites**: Save your favorite hotels for easy access.
- **Search Functionality**: Quickly find hotels that meet your criteria.
- **User Authentication**: Secure sign-in functionality.
- **Interactive Map**: View hotels on an interactive map.
- **User Profile Management**: Manage your user profile within the app.

## Components

- `HotelInfo.js`: Component to display detailed information about hotels.
- `MenuBar.js`: Navigation menu for the app.

## Key Functionalities in ReactNative-Hotels-App

### Sign In/Sign Up Process
- **Implementation**: Utilizes Firebase's `auth` module with `signInWithEmailAndPassword` and `createUserWithEmailAndPassword` functions.
- **Usage**: 
  - Sign In: Users enter their email and password to authenticate against Firebase.
  - Sign Up: New users can create an account with their email and password.

### User State Management Across Screens
- **Global State Context**: Employs a React context (`useGlobalState`) for managing and accessing user information globally.
- **State Persistence**: User information is stored in the global state upon sign-in/sign-up, ensuring consistency across screen transitions.

### Source of Hotel Information
- **API Integration**: The information is retrieved from an external API called [Booking](https://rapidapi.com/apidojo/api/booking). It contains an extensive amount of data of the hotels found on various traveling websites and is called by using Axios for HTTP requests.
- **Displayed data**: Altough the API contains a large amount of data for each hotel, the present app uses only the name, location, price, picture and distance from center for each hotel.

### Favorites Feature
- **Storage**: Favorites are stored in Firebase Firestore, referenced by `favoritesRef` in `firebase.js`. This is achieved by using different functions of the firestore library to add documents to collections while verifying existing items in the database to avoid redundancy.
- **Viewing Favorites**: The `FavoritesPage.js` screen allows users to view and manage their favorite hotels. This is done by querying the collections in Firestore to retrieve only the favorites of the global user.
- **Removing Favorites**: Users can also remove hotels from their favorites, which updates the Firestore 'favorites' collection.

### Additional Points
- **Navigation**: Uses React Navigation for screen transitions and navigation.
- **Map Integration**: Incorporates `react-native-maps` in `MapPage.js` for displaying hotel locations on an interactive map.
- **Menu bar**: Bottom menu bar create with the `@react-navigation/bottom-tabs` library and allows the user to navigate through Home, Profile and Favorites pages.

## Screens

### `SignIn.js` 
User authentication screen that contains email and password fields with two buttons, one for sign in and one for sign up. The logic behind the two buttons allows the user to access directly the homepage, if the input information is accepted.
 <div align="center"> 
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/2ae1d97f-e873-45f7-bb14-aab490e7a99b" width="300">
 </div>
 
### `HomePage.js`
The landing page of the app. It contains a TouchableOpacity element allowing the user to open the search page.
  <div align="center">
    <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/a7be5cfc-c028-4a3b-90fb-41987178dbe0" width="300">
  </div>

### `SearchPage.js`
Search for hotels. Contains a TextInput and multiple TouchableOpacity elements. The first field contains the city, the next two TouchableOpacity elements both open a Modal element allowing the user to pick dates and the last field also opens a Modal element containing a picker for filters (The user can add or remove the desired number of rooms, adults and children).
When pressing the search button, the fields are checked to avoid errors and a HTTP request is made to the API to first get the coordinates of the city and after that, a second HTTP request is sent to retriever all the hotels in the area.
<div>
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/c0b571af-d6da-4cf7-884c-61c178e3d740" width="300">
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/796b56d9-59c2-49f4-b07a-bbdade59be0e" width="300">
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/83754ae2-9cb5-412b-9671-c7f64a09e34a" width="300">
</div>

### `MapPage.js`
Interactive map showing hotel locations. Each location is displayed with a marker on the map. If a marker is pressed, a new HotelInfo component is animated to preview the informations we have about the hotel in question. The preview page contains a picture of the hotel on the background, a back button to close the preview, a "Favorites" button to add the informations of the hotel to the database and a BlurView element containing the infos of the hotel with a button redirecting the user to a website in order to finalize the booking.
<div align='center'>
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/2c822fbb-a914-41c2-9df7-7cdc73489634" width='300'>
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/a51ca5c7-66a0-4351-9547-15492b127e85" width='300'>
</div>

### `FavoritesPage.js` 
View and manage your favorite hotels. The favorites are displayed in a ScrollView and if they are swiped to the left, a delete button appears. Pressing it will remove the element from the database and refresh the page to display the remaining items. The swipeability is achieved by using the `react-native-gesture-handler` library, which allows performing actions by doing various types of gestures on the screen.
<div align='center'>
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/3190591b-f5aa-429d-828b-e2c064fec1b9" width='300'>
  <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/ee260856-4c3b-468f-890e-1e1525641793" width='300'>
</div>

### `ProfilePage.js` 
User profile management screen.
  <div align="center">
    <img src="https://github.com/danipaco0/ReactNative-Hotels-App/assets/7733838/db10881b-74fe-42b3-a654-055b8d6f6da0" width="300">
  </div>


## License

This project is licensed under the MIT License - see the LICENSE file for details.
