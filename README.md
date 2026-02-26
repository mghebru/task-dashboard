**Task Dashboard**

A modern Task Management Dashboard built with React + TypeScript + Vite.
This application allows users to create, update, filter, and manage tasks with an intuitive and responsive UI.

**📂 Project Structure**


src/

│
├── components/
|   |
│   ├── TaskFilter/
|   |   |
|   |   ├──TaskFilter.tsx
|   |   |
│   └── TaskForm/
|   |   |
|   |   ├──TaskForm.tsx
|   |
│   ├── TaskList/ 
|   |  |
|   |  ├── TaskList.tsx
|   |  |
|   |  └──  TaskItem.tsx
|   |
│   └── DashBoard/
|       |
|       ├──Dashboard.tsx
|
├── types/
|
│   └── Task.ts
|
└── App.tsx



**📦 Installation**

**Clone the repository:**

git clone https://github.com/your-username/react-task-dashboard.git

**Navigate to the project directory:**

cd react-task-dashboard

**Install dependencies:**

npm install

**Start development server:**

npm run dev





**Reflection**

**How you implemented React and TypeScript features**
To implement react and typescript features I used components for different aspects of the task form which makes 
code more maintainble and reusable, I also used other react features such as useState and useEffect to create differnt
functionalities for components. Typescript features implemented that helped create a more robus application were type interface
for all the differnt components in order to understand the role each part played in creating the form, as well as advanced type features
such type alias and unions.


**The challenges you encountered and how you overcame them**
Some challenges I faced when creating this project was implementing useReducer as it is a slightly more efficient way of 
tracking state than useState but I did not feel confident in the syntax and did not implement it.


**Your approach to component composition and state management**
When creating components, I followed the provided outline and then started with an interface to understand how I wanted to
structure each component. I also wanted to ensure I created components that were clean and communicated with eachother which required
the correct use of imports. To handle state management, I ensured that the virtual dom was only checking for changes in assigned 
fields and updated the UI based on those changes.


