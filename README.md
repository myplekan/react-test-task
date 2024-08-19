# React Test Task

This project demonstrates the use of React, `react-grid-layout`, and WebSocket to create interactive and real-time components.

## Sections

**Libraries and Resources:**
- **`react-router-dom`**: Provides routing capabilities to navigate between different sections of the application.

### Section 1: Layout with `react-grid-layout`

**Libraries and Resources:**
- **`react-grid-layout`**: Provides an interactive grid layout with drag-and-drop and resize capabilities.
- **`react`**: Used for component creation and state management.
- **`typescript`**: For static typing and improved code reliability.
- **`localStorage`**: To save user layouts between sessions.
- **CSS files**: For styling components.

**Data Structures:**
- **Array of Objects (`CustomLayout[]`)**: Stores the position and properties (size, position, `zIndex`) of elements. This allows for easy management of the layout and storage of element information.

### Section 2: WebSocket Integration

**Libraries and Resources:**
- **`react`**: For state management and component rendering.
- **`typescript`**: For static typing and code consistency.
- **WebSocket API**: Connects to blockchain.info to receive real-time updates.

**Data Structures:**
- **Array of Objects (`Transaction[]`)**: Stores transaction data received via WebSocket. This facilitates the updating of the transaction list and calculation of the total transaction value.

## Preview

You can view a live preview of the project at the following link:

- [Preview](https://myplekan.github.io/react-test-task/#/)
