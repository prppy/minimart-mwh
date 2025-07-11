// routes/tasks.js
const taskRouter = express.Router();
const TasksController = require('../controllers/tasksController');

taskRouter.get('/', authenticateToken, TasksController.getAllTasks);
taskRouter.get('/categories', authenticateToken, TasksController.getTaskCategories);
taskRouter.post('/', authenticateToken, requireOfficerOrAdmin, TasksController.createTask);
taskRouter.put('/:id', authenticateToken, requireOfficerOrAdmin, TasksController.updateTask);
taskRouter.delete('/:id', authenticateToken, requireOfficerOrAdmin, TasksController.deleteTask);