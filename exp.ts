// // server.js
// const express = require('express');
// const app = express();

// app.use(express.json());

// const todos = [
//   {
//     id: 1,
//     task: 'Take out the trash',
//     completed: false
//   },
//   {
//     id: 2,
//     task: 'Buy groceries',
//     completed: false
//   },
//   {
//     id: 3,
//     task: 'Do laundry',
//     completed: true
//   }
// ];

// app.get('/todos', (req, res) => {
//   res.send(todos);
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// // ========================================

// // App.js (React component)
// import React, { useState, useEffect } from 'react';
// import { List, Typography, Button, message } from 'antd';

// const { Text } = Typography;

// function App() {
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/todos')
//       .then(res => res.json())
//       .then(todos => setTodos(todos))
//       .catch(error => message.error(error.message));
//   }, []);

//   const handleComplete = (id) => {
//     setTodos(todos.map(todo => {
//       if (todo.id === id) {
//         return {
//           ...todo,
//           completed: !todo.completed
//         };
//       }
//       return todo;
//     }));
//   };

//   return (
//     <List
//       header={<Text strong>To-Do List</Text>}
//       bordered
//       dataSource={todos}
//       renderItem={todo => (
//         <List.Item
//           actions={[
//             <Button type="primary" onClick={() => handleComplete(todo.id)}>
//               {todo.completed ? 'Undo' : 'Complete'}
//             </Button>
//           ]}
//         >
//           <Text
//             style={{
//               textDecoration: todo.completed ? 'line-through' : 'none'
//             }}
//           >
//             {todo.task}
//           </Text>
//         </List.Item>
//       )}
//     />
//   );
// }

// export default App;
