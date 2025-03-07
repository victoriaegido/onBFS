# Base Project with React - onBFS
This project, developed with React and pnpm, is designed to practice key React concepts and the use of reusable components. Its goal is to provide a clear and stable code structure that ensures proper maintainability and scalability.

 # Technologies used
    - **React**: JavaScript library for building dynamic and efficent user interfaces.
    - **React Router**: Library for managing navigation between pages in React application.
    - **pnpm**: Fast and efficient package manager that optimizes disk space usage.
    - **TypeScript**: Superset of JavaScript that adds static typing for better safety and development experience.
    - **SCSS**: CSS extension that allows for more structured and reusable styles.

# Project Setup
 ## 1. Install dependencies 
        To install the project dependencies, open a terminal in the root folder and execute the following command:
        ```bash
            pnpm install
        ```

 ## 2. Execute the project
        To run the project, open a terminal and execute the following command:
        ```bash
            pnpm install
        ```
        This will start the app at http;//localhost:3000/


# Project Structure
src
├─── app
|    ├─── components
|    |    ├─── content
|    |    ├─── layout
|    |    ├─── shared
|    |    
|    ├─── routes
|    ├─── pages
|    |    
|    ├─── services
|    ├─── store
|    |    ├─── slices
├─── assets
└─── styles

- **`components/content`**: Contains the components responsible for structuring the main content of each page.
- **`components/layout`**: Contains the components responsible for the overall structure of the application.
- **`components/shared`**: Contains reusable components that can be used across different parts of the application.

- **`pages`**: Contains the files that represent the different pages of the application.

- **`routes`**: Contains the application's route configuration. It defines how navigation between different pages works ans which components are rendered for each route.

- **`store`**: Contains the configuration of the application's global state using Redux Toolkit. it icludes the estore setup and slices, which define the logic and actions for handling the state of posts and other entities.

- **`styles`**: Contains global styles.
