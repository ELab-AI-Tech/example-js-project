---
name: create-component
description: Scaffold a new React component for the ai-failure-modes-demo repo. Use when the user asks to create, add, scaffold, or generate a new React component, card, row, badge, or UI element. Produces a JSX file under src/components/ matching the existing UserCard.jsx pattern.
---

# create-component skill

Follow these steps every time you scaffold a new component in this repo.

1. Read `src/components/UserCard.jsx` to confirm the current pattern before writing anything.
2. Create `src/components/<ComponentName>.jsx`. Use the exact shape below — default export, destructured props, plain JSX, double quotes, no TypeScript.

```jsx
export default function <ComponentName>({ /* props */ }) {
  return (
    <div className="card">
      {/* content */}
    </div>
  );
}
```

3. Do not import any icon library — none is installed.
4. Do not add a CSS file unless the user asks. Reuse existing class names from App.css.
5. Do not register the component in a router or index file unless the user asks.
6. Return only the new file contents. Do not summarise what you did.