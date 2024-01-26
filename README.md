# Assignment 1: Simple List App

* Author: David Rodriguez
* Class: CS402 Section 1
* Semester: Spring 2024

## Overview

This application is a list management tool, allowing users to add, delete, join, and split items. It also provides a feature to select multiple items and perform operations on them, with visual feedback for selected items.

## Reflection

The hardest part about developing this app was learning how to use `useState`. When I started working on the dynamically-changing elements of this project, I was looking for ways to select elements by ID like I usually do in JavaScript. After going over this topic in class, however, I finally understood `useState` is a variable-function pair that reactively changes UI when the state of the app changes. This is definitely a new way of programming for me, but nonetheless, a useful one.

In future projects I would like to practice better code organization. This app was entirely written in the `App.js` file, making the code look crammed and harder to understand. For example, I could have the entire `FlatList` as its own object in a different file. Similarly, I sometimes wrote the handler methods as arrow functions and sometimes I wrote them separately as expressions. My goal for the next project is to make the `App.js` file as human-readable as possible by separating my code into different files and sections based on similar functionality.

## Compiling and Using

Use one of the two following ways to compile and run the `App.js` program:

1. Make sure Node.js and the [expo library](https://www.npmjs.com/package/expo) is installed in your machine as well as the *Expo Go* app on your mobile device. In the terminal, `cd` into the main directory and run `npx expo start`. With your mobile device, scan the given QR code to render the program on the Expo Go app.
2. Head to the [Expo snack](https://snack.expo.dev/) platform online and copy and paste the `App.js` source code. This will render the application on the web-player on the left side of the screen.

Once rendered, find your control buttons at the bottom of the screen. Click on the `Add` button to add new list item in the section above. Tap on the list items to select which list items to delete or merge together using the `Delete` and `Join` buttons, respectively. To revert joined list items, select the item you wish to split and click on the `Split` button.