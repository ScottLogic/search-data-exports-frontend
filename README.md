[![CircleCI](https://circleci.com/gh/ScottLogic/search-data-exports-frontend.svg?style=svg&circle-token=d7daa10ea7ae5395d3f8d70922fa62bfdb2a6e70)](https://circleci.com/gh/ScottLogic/search-data-exports-frontend)

## Notes - 19/07/2019 
To run locally, create a local .env file based on the template in .env.local which will contain the URL of which to point to the search API gateway. 

## Notes - 12/07/2019

### Components

* All Components are functional components (as opposed to class components) meaning [hooks](https://reactjs.org/docs/hooks-intro.html) are used in place of traditional class state and lifecycle functions
* App.jsx, Header.jsx, and ResultList.jsx are all presentational components, they are solely responsible for taking props and rendering them appropriately 
* AppContainer.js is currently the only container component, it is responsible for handling the functional logic of the application

### API Requests

* Created in the utilities/requestCreator.js file
* AppContainer currently uses the mockAPICall function to get mock data to display, this can be replaced with an actual API call when ready, the structure of the request should be correct
* API call functions could be located in files under src/api/fileName.js or a similar structure
* API calls can be made using fetch or a 3rd party alternative such as [Axios](https://www.npmjs.com/package/axios), which could be more useful

### Additional functionality

* There is currently no way to search by a specific field (all searchs target all fields) so this could potentially be added
* There is currently no way to search by a date range, if this is wanted it could be useful to use a 3rd party library such as [react-dates](https://www.npmjs.com/package/react-dates)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
