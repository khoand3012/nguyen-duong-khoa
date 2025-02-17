import express from 'express'
import itemController from '../../controllers/itemController';

const router = express.Router();

// Item routes
router.get('/items', itemController.getItems);
router.get('/items/:id', itemController.getItemById);
router.get('/find/items', itemController.findItems);
router.post('/items', itemController.createItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

export default router;