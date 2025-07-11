// routes/users.js
const userRouter = express.Router();
const UsersController = require('../controllers/usersController');

userRouter.get('/', authenticateToken, requireOfficerOrAdmin, UsersController.getAllUsers);
userRouter.get('/:id', authenticateToken, requireOwnershipOrStaff, UsersController.getUserById);
userRouter.put('/:id', authenticateToken, requireOwnershipOrStaff, UsersController.updateUser);
userRouter.delete('/:id', authenticateToken, requireOfficerOrAdmin, UsersController.deleteUser);