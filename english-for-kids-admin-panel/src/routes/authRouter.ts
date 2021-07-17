const Router = require('express');
const router = new Router();
const login = require('./authController');
var multer = require('multer')
import { authenticateToken } from '../helpers/helpers';
import { createCategory, createWord, deleteCategory, getCategories, getWords, updateCategory } from './dataController';

var storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, 'uploads/')
  },
  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage });

router.post('/login', login);
router.get('/categories', authenticateToken, getCategories);
router.post('/categories', upload.none(), createCategory);
router.put('/categories', upload.none(), updateCategory);
router.delete('/categories', deleteCategory);
router.get('/words', authenticateToken, getWords);
router.post("/words", upload.fields([{
  name: 'image',
  maxCount: 1
}, {
  name: 'audio',
  maxCount: 1
}]), createWord);

module.exports = router;

