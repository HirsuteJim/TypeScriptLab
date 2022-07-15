# Module: TypeScript

## Summary

In this unit, you will be using TypeScript to create a full-stack version of Tic-Tac-Toe, with a React frontend and a Node/Express server.

## Learning Goals

- [ ] Become familiar with TypeScript's features and syntax, what it adds to JavaScript, and static/strong typing.
- [ ] Learn to configure a TypeScript application, in conjunction with a module bundler such as Webpack.
- [ ] Use TypeScript along with React and Node/Express.

## Getting Started

- Run `node -v` to make sure you're using a recent version of Node! This unit uses ESM `import` statements on the backend, which older versions (prior to 12.17) do not support - so if your version is lower than this, you'll need to install a later one.  

- Run `npm install` to install all dependencies

- Run `npm start` to run the Webpack dev server on `localhost:8080` and the Node server on `localhost:3000`

- Navigate to `localhost:8080` in your browser to view the application

## TypeScript challenge

Upon initially running `npm start`, you'll notice a Webpack compilation error in the terminal. Although the application is written in TypeScript, our webpack configuration is currently set up to parse only JavaScript code. In order to run our TypeScript files, we'll need to do some additional setup. 

### Webpack and TypeScript

Our Webpack configuration needs to be altered in order to run TypeScript files. You can refer to the documentation on configuring Webpack for TypeScript code [here](https://webpack.js.org/guides/typescript/).

- [ ] Navigate to the `webpack.config.js` file. It's currently set up to test for `.js` and `.jsx` file extensions, and accordingly allow us to run Babel on these files. We'll need to test for `.ts` and `.tsx` files and specify how they should be transpiled - this time, we won't be using Babel, but rather the [npm package](https://www.npmjs.com/package/ts-loader) `ts-loader`. 

### TypeScript configuration

TypeScript projects also require a **TSConfig** file, which is a JSON file that sets the TypeScript compiler's configuration options. Before we can run our application, we'll need to create this as well. You'll probably want to refer to the documentation as you set this up - an overview can be found [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html), and a detailed reference of all configuration options can be found [here](https://www.typescriptlang.org/tsconfig).

- [ ] In the root directory, create a file called `tsconfig.json`. The presence of this file will indicate that the directory is the root of a TypeScript project - and in order to compile our files, we'll need to set some specifications.
- [ ] First things first, the compiler needs to know where in the directory to look for TypeScript files, and which files it should compile. We can specify this using either a list of individual **files**, or a list of directories under which all subfiles will be **included**.
- [ ] We also need to set a `compilerOptions` property - this will be an object containing a number of key-value pairs that will set specific rules for the TypeScript compiler to follow. There are many different possible option properties that can be set here - for reference, [this section of the documentation](https://www.typescriptlang.org/tsconfig#compilerOptions) breaks them up into a number of different categories and outlines each. For the purposes of this unit, however, we'll only need to specify a few of them:
  - [ ] Our project uses JSX syntax, so we'll need to tell the compiler what to do with this. In the JavaScript code that our TypeScript files will compile to, any JSX components should be converted into calls to `React.createElement`.
  - [ ] As we learned in the Build Tools unit, there are several different specifications that JavaScript modules may follow - the most common being *ES Modules* and *CommonJS*. TypeScript follows the ESM specification, and by default, treats all modules as if they are ES6 modules. Although the code in our application exclusively uses ES6 `import` and `export` statements, Node's internal code and many of the npm packages we're importing are written using CommonJS-style calls to `require`. Because these two module systems work differently under the hood, modules imported via `require` will often be incompatible with the TypeScript compiler's default configuration. Therefore, we'll need to 1) specify that our project uses CommonJS, and 2) set an option to ensure **interopability** between ESM and other module systems.
  - [ ] Remember that TypeScript is a *superset* of JavaScript, which means all JavaScript is technically valid TypeScript code. But TypeScript is statically typed, whereas JavaScript isn't - so how does this work? Well, TypeScript has an interesting feature called **type inference** - which means that if a variable doesn't have a type specified, TypeScript will infer what it should be and assign one automatically. If it can't tell (i.e the shape of the variable doesn't match any types we've defined), it will default to `any`. Since it's best practice to avoid using the `any` type as much as possible, let's set an option to restrict this behavior. What option can we include to **disallow variables with an implicit type of `any`**?
- [ ] Once TypeScript and Webpack are both configured correctly, the TypeScript loader will be able to parse your files and will begin to compile your code. Unfortunately, however, the React app still isn't loading! You'll see an error message in both the terminal and in your browser window, which should give you some insight into what's going on - we've just encountered our first TypeScript compiler error. 

## Eliminating typing errors

The error message will be dircting you to the `Board.tsx` file in your `client` folder, so you'll want to go here next. Before you proceed to debugging, you'll probably want to read through the boilerplate code in this file and familiarize yourself with the logic. Our Board component isn't yet set up to render anything, but we've defined its state, associated types, and a couple of helper methods for our Tic Tac Toe game.

- [ ] You'll next want to look at the line that's being flagged. On this line, we're invoking a function called `getScores` with two arguments - however, the compiler is telling us that it expected 0 arguments. TypeScript requires functions to be invoked in a way that *matches* their definition - in other words, we cannot pass in any arguments that we didn't explicitly define.

- [ ] Scroll down to where `getScores` is defined. The function doesn't contain any code yet - we can worry about that later - but before we can proceed, we'll need to at least satisfy the compiler's requirements. Give it some parameters that *match the type* of the two arguments being passed in.

- [ ] You might notice that this doesn't fully get rid of the error, but rather triggers another one. In the `componentDidMount` lifecycle method, we're calling this same `getScores` function, but this time with no arguments - and the TypeScript compiler isn't happy about this either. Without changing either invocation of `getScores`, modify its definition so that both are valid. (Hint: how can we specify that a parameter may be *optional*?)

- [ ] Once `getScores` is defined in a way that's compatible with both invocations, you should stop getting error messages, and the page is now rendering. Yay! 

- [ ] Now that we've gotten rid of those errors, let's add some more typing to this file. The following types are aliases being imported from the `types.ts` file, and we'll jump into their specifics in the next section:
  - Give the `newBoard` function a return value type of `BoardContent`
  - Give the winner variable in your `checkForWinner` function the type `Player`

- [ ] We should also add typing for the results of all our functions:
  - We are not returning any values in our `resetBoard` and `checkForWinner` functions. What is the appropriate type for scenarios where we disregard whatever the function returns?
  - Considering the values that the `spacesLeft` function can return, what would be the appropriate typing? 

## Setting Types

Before we jump into building out the components, first we will refactor some of the aliases we're using to be more specific. 

- [ ]  Navigate to the `types.ts` file in your src folder. You will find 4 aliases.
- [ ] The Scoreboard alias has already been written for you. It is an object containing two properties, "X" and "O", and keeps track of the number of times each player has won. The rest of the aliases are set to any, and we'll want to make them more specific.
- [ ] First, let's start by updating the `Player` alias. It should encompass both of the available player options: the strings "X" and "O".
- [ ] Next, we'll want to update the `BoardText` alias. It defines all possible text options that can be displayed in our box component: "X", "O", and "-".
- [ ] Finally, we need to update the `BoardContent` alias. This alias will represent the current state of the board, specifying the text that each of our boxes renders. Take a look back at the `newBoard` variable in your `Board.tsx` file and you will find that it's an array. But if we simply say the type `BoardContent` is an array, then we can potentially have any character be passed into one of our boxes. Notice that the engineer who created this file accidentally added a tilde instead of a dash for one of our elements, and there was no error to help him/her/them catch their mistake. How do we restrict the `BoardContent` type to be an array of subarrays whose elements are restricted to what we would find on our board?
- [ ] After updating the type `BoardContent`, take a look at the `newBoard` variable again. If it's set up properly, the tilde will now be flagged. But if you scroll down in the file, you will find that another problem has been flagged! It looks like the engineer who wrote this mistakenly typed in a lowercase "o" instead of an uppercase "O". TypeScript is very handy for debugging small issues like this.


## TypeScript with React

Let's go ahead and finish building out the application. We'll start at the lowest level component, the box.

- [ ] Navigate to the `Box.tsx` file. 
- [ ] As with all functions, we must explicitly define any arguments our React functional components will take in - which, in this case, is the `props` object. Create a type `BoxProps` that defines the specific props we expect to be passed to this component. Because this type won't be used anywhere else in the application, it can be defined in this file. If you would prefer to keep all of your types in one place, you can add the `BoxProps` type to the `types.ts` file and import it.
- [ ] Add all the props to your type `BoxProps`. One of the props you should include will be a function called `handleBoxClick`. As the state of the board lives in the Board component, the functionality for `handleBoxClick` will live in the Board and be passed down to the box component. 
  - [ ] It's up to you to determine what other props your Box component should take. Make sure that all of them are typed thoughtfully. If you need to use any of our previously defined types, you'll want to import them from `types.ts`. 
- [ ] Now you can add the props as a parameter to your functional Box component, and make sure to specify that the passed in props should be of type `BoxProps`. Next, we'll incorporate the props into the button our Box component is rendering. This button needs to render the correct character, and should invoke the `handleBoxClick` function when clicked.

Now that the Box component is complete, we will work on the Row component. Your board will render three row components, and each row should render 3 box components.

- [ ] Navigate to the `Row.tsx` file. We need to set up a type for our row's props in the same way we set up our `BoxProps` type. Add a `RowProps` type and define its properties with the appropriate typing.
- [ ] With proper typing, declare an array containing 3 Box components for the row to render. 
  - [ ] Because our components are all JSX elements, we can type our array as containing only the `JSX.Element` type. 
  - [ ] Remember, each box should be passed the properties we defined on `BoxProps`. Also, make sure to include a unique key with each box.
- [ ] Again, be sure to import any types you want to use from `types.ts`.

Now let's head over to the board component to finish up the front end!

- [ ] First, let's go ahead and write some logic to create each of our rows. Make sure to pass in all of the properties expected by our `RowProps` type.
  - [ ] When you're done with this, uncomment the line that renders `rows` in the return statement below.
- [ ] Voilà! You should now be able to see your tic tac toe board in the browser! While beautiful, your board won't be functional until we've added some code to the `handleBoxClick` method. Write your logic to update the board here, and remember to properly type the function as you go!
  - [ ] In this function, you should create a variable of type `BoardContent` that creates a copy of the current board's state. 
  - [ ] Once you've copied the board, call `setState` to update the correct element in the board based on which box was clicked.  
    - Make sure your call to `setState` updates the current player as well. After finishing up this functionality, your tic-tac-toe game should be functional.

Now, go back through to double-check the board file and add typing wherever possible!

## TypeScript with Node and Express

Now that our game is functional, we'll be adding in some backend functionality to store how many wins each player has in a scoreboard. 

- [ ] First, let's take a look at your backend. In your `server.ts` file, you have three endpoints set up. You will be building out the middleware for each of these endpoints, located in the `playerController.ts` file. For this unit, we will be using the `db.json` file as our database. We will read from and write to our file using Node's `fs` module.

- [ ] While we are looking at this server file, let's go ahead an uncomment the global error handler so that we can add some typing to it. 
  - [ ] Define a type called `ServerError` that corresponds to the default error.
  - [ ] Let's also type the parameters that our error handling function takes. Remember, error handlers in Express must take in four arguments: an **error**, the **request**, **response**, and the **next function**.
    - If you look at the `package.json`, you'll see that we've installed a [package](https://www.npmjs.com/package/@types/express) called `@types/express`. This package adds types to Express's library and makes them available for us to import - which we're doing at the top of our `server.ts` file. `Request`, `Response`, and `NextFunction` are types that correspond to Express's request/response objects and the `next` function.
    - For the first parameter, you can use the `ServerError` type you just created.

- [ ] Before we build out our middleware, let's revisit our `Board.tsx` file and add some code to the `getScores` function. This function should make an AJAX request to the `/api` route. As you saw earlier, this function is invoked in two places: in the `componentDidMount` that gets the scores on load, and in the `checkForWinner` function to update the database whenever a player wins. Set up this method so that it can make both types of requests. By making the parameters optional, you've enabled some more flexibility in this function. For the `POST` method, make sure to include the winning player on the request body.
  - Remember to type the callbacks for your chained `then` and `catch` invocations! (Refer to the responses being returned in `server.ts` for what data type the arguments should be.) 
  - We will want our response object to be of type `Scoreboard` after it's parsed.

- [ ] Now that the frontend is looking good, let's go work on your controllers! In the `playerController.ts` file, you will find a `playerController` object being exported. This object contains the methods `getScores` and `updateScores`. Before we add functionality to the middleware, let's first create an alias for the controller. As with the `BoxProps` and `RowProps` aliases, this type can either be declared in the file it's being used, or imported fromo the `type.ts` file. This alias should be an object with each of the middleware functions as properties.
  - [ ] Handily, the Express types package gives us an interface for what middleware functions should look like. We're importing this interface as `RequestHandler` at the top of the file, and both of our controller methods should conform to it.  

- [ ] When you define your `getScores` function, add in all of the parameters that you normally would for Express middleware, and again, make sure that all the parameters are typed appropriately. 
  - [ ] This middleware should retrieve the scoreboard in your `db.json` file using the `fs` module. It should then store the results in a variable with type `ScoreBoard` on `res.locals`. Be mindful of the fact that `db.json` is written in JSON.

- [ ] Your `updateScores` function will need to first access the current scoreboard in your `db.json`. It then needs to update the scores based on the winner, which should have been passed to this middleware on the request body. Then, we'll want to overwrite the current `db.json` file with the updated scores. 

- [ ] Make sure that you add typing to all variable declarations, parameters, and functions. And don't forget about error handling!

## Extensions

- [ ] Refactor your solution so that the board is a functionanl component that uses hooks!
  - When finished, the board's state should maintain all of the same variables: `board`, `currentPlayer`, `message`, `gameOver`, and `scoreBoard`.
  - As before, the `getScores` function should be invoked immediately upon loading to retrive the recorded scores from our JSON file.
  - The `checkForWinner` function should be invoked whenever the Board component rerenders.
  - Notice that if you try to call the setter functions returned from your `useState` hooks with a data type that doesn't match what you initially passed in, TypeScript won't accept it. This is becuase TypeScript uses [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) to assume the relationship between the input and output of `useState`.
    - Several parts of our state `board`, `currentPlayer`, and `scoreBoard` make use of our custom type aliases. How can we modify the calls to `useState` so that their returned setter functions will accept *only* these specific types?
