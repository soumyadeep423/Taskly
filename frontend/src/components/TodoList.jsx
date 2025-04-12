import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/todos`);
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch todos');
      setLoading(false);
    }
  };

  const addTodo = async e => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/api/todos`, { text: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo('');
    } catch (err) {
      setError('Failed to add todo');
    }
  };

  const toggleTodo = async id => {
    try {
      const res = await axios.put(`${API_BASE_URL}/api/todos/${id}`);
      setTodos(todos.map(todo =>
        todo._id === id ? res.data : todo
      ));
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const deleteTodo = async id => {
    try {
      await axios.delete(`${API_BASE_URL}/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        My Todos
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper
        component="form"
        onSubmit={addTodo}
        sx={{
          p: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          bgcolor: 'background.paper',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          type="submit"
          startIcon={<AddIcon />}
          disabled={!newTodo.trim()}
        >
          Add
        </Button>
      </Paper>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {todos.map(todo => (
            <ListItem
              key={todo._id}
              sx={{
                bgcolor: 'background.paper',
                mb: 1,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Checkbox
                edge="start"
                checked={todo.completed}
                onChange={() => toggleTodo(todo._id)}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
              <ListItemText
                primary={todo.text}
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? 'text.secondary' : 'text.primary',
                }}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => deleteTodo(todo._id)}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      bgcolor: 'error.light',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TodoList; 