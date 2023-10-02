# Storydoc Interview

Create a Kanban board application with multiple workspaces, groups of tasks, and subtasks. Users should be able to create, update, delete, reorder, and move items within the board.

## Project Requirements

- [x] Display multiple workspaces with names and task groups.
- [x] Create, update, and delete workspaces.
- [ ] Reorder workspaces via drag-and-drop.
- [ ] Create, update, and delete task groups within workspaces.
- [ ] Reorder task groups within a workspace via drag-and-drop.
- [ ] Create, update, and delete individual tasks within task groups.
- [ ] Move tasks between groups in the same workspace via drag-and-drop.
- [ ] Add subtasks to tasks, including creating, updating, and deleting them, with checkboxes for completion.
- [ ] Display a task completion counter within each group.

### Additional

- [ ] State preservation: retain data and state on page refresh.
- [ ] Workspace flexibility: allow moving tasks or groups between workspaces.
- [ ] Deployment: deploy the project on a server.

## Technical requirements:

1. Use [redux toolkit](https://redux-toolkit.js.org/) for efficient state management.
2. Implement drag-and-drop functionality using the [d&d-kit library](https://dndkit.com/).
3. Follow the [figma](https://www.figma.com/file/b07PBc2s9CL3LiucnOg3g4/Storydoc-Design%2FDev-test?type=design&node-id=0-1&mode=design&t=uUVcvHBAlr5DmNJk-0) design provided for the kanban board.

## Getting Started

1. Install dependencies

```sh
npm install
```

2. Run app locally

```sh
npm run dev
```

3. To start working on code, open app locally:

```
http://localhost:3000/
```
