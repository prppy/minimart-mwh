// routes/leaderboard.js
const leaderboardRouter = express.Router();
const LeaderboardController = require('../controllers/leaderboardController');

leaderboardRouter.get('/', authenticateToken, LeaderboardController.getLeaderboard);
leaderboardRouter.get('/stats', authenticateToken, LeaderboardController.getLeaderboardStats);
leaderboardRouter.get('/batch/:batchNumber', authenticateToken, LeaderboardController.getLeaderboardByBatch);
leaderboardRouter.get('/user/:userId/position', authenticateToken, requireOwnershipOrStaff, LeaderboardController.getUserPosition);