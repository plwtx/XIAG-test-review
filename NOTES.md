### Notes

Below you can find my notes and comments additional to inline comments within the code.

---

#### 0. Structure

###### Current complete structure:

```
.
├── .idea/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── App/
│   │   │   ├── App.css
│   │   │   ├── App.test.tsx
│   │   │   ├── index.tsx
│   │   ├── InputNewTodo/
│   │   │   ├── index.tsx
│   │   │   └── InputNewTodo.module.css
│   │   ├── MainApp/
│   │   │   ├── index.tsx
│   │   │   └── MainApp.module.css
│   │   └── UserSelect/
│   │   │   ├── index.tsx
│   │   │   └── UserSelect.module.css
│   ├── store/
│   │   └── index.ts
│   ├── global.d.ts
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── README.md
├── TODO.md
├── tsconfig.json
└── yarn.lock
```

###### Preferred structure:

```
.
├── .idea/
├── node_modules/
├── public/
├──src/
│   ├── assets/              # Static files (images, icons, fonts).
│   ├── components/          # Shared UI components.
│   │   ├── ui/              # Reusable  components.
│   │   └── layout/          # Sidebars, Navbars & other general layout components.
│   ├── features/
│   │   ├── todo-list/       # Components related to TODO
│   │   │   ├── components/  # Feature-specific components (InputNewTodo)
│   │   │   ├── hooks/       # Feature-specific logic (useTodos)
│   │   │   └── services/    # API specific to TODO.
│   │   └── user-select/
│   │   └── user-management/ # Components related to USER.
│   ├── hooks/
│   ├── pages/               # Seperated by routes.
│   ├── store/               # State management.
│   ├── utils/               # Class constructors, CVAs & etc.
│   ├── App/                 # Main application entry.
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── index.tsx
│   │   ├── MainApp/
│   └── index.css
│   ├── global.d.ts
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── README.md
├── TODO.md
├── tsconfig.json
└── yarn.lock
```

**Explanation:**
I would add a `/features/` directiory to reduce the size of general components folder. With this approach I would seperate the logic and UI / layout components. It would keep the app much easier to navigate as it scales. For routes I would use seperate `/pages/` directory. With these changes project structure would fit React's ideal SoC principle.

---

### Major Issues & Fixes:

#### 1. Issue with `store/index.ts`

    The error upon running the app happens because the Redux state is being mutated directly in the reducer, which violates Redux principles.

**Fix**: Returning a new object with a new array instead of modifying original state. (Check inline comment withing `store/index.ts`)
Additionally as a good practice we can spread the state into CHANGE_TODOS.

#### 2. Issue with `components/MainApp/index.tsx`

    Checkmark of "all todos is done!" only listens to the last task added.

**Fix**: Replace map loop in index.tsx with the .every() method, so it correctly checks if all items match the condition. (Check inline comment withing `components/MainApp/index.tsx`)

#### Minor Issues & Fixes:

- Upon adding a task there is no option for "Unassigned," so the browser will default to the first user in the list.

- There should be a limit on characters of task name.

- Add user key so there is no lack of UID (key={user.id} to options in `src/components/UserSelect/index.tsx`, `src/components/MainApp/index.tsx`)

- Warning within browser console appears because the "all todos is done!" checkbox has a value (checked) but no way to change it (onChange), to fix this, we can add the readOnly prop to that specific checkbox:
