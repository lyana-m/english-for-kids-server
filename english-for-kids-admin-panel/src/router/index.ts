const Router = require('express');
const router = new Router();
const login = require('../controllers/auth-controller');
var multer = require('multer')
import { authenticateToken } from '../helpers/helpers';
import { createCategory, createWord, deleteCategory, deleteWord, getAllWords, getCategories, getWords, updateCategory, updateWord } from '../controllers/data-controller';

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
router.post('/categories', authenticateToken, upload.none(), createCategory);
router.put('/categories', authenticateToken, upload.none(), updateCategory);
router.delete('/categories', authenticateToken, deleteCategory);
router.get('/words', authenticateToken, getWords);
router.get('/allwords', authenticateToken, getAllWords);
router.post("/words", authenticateToken, upload.fields([{
  name: 'image',
  maxCount: 1
}, {
  name: 'audio',
  maxCount: 1
}]), createWord);
router.put('/words', authenticateToken, upload.fields([{
  name: 'image',
  maxCount: 1
}, {
  name: 'audio',
  maxCount: 1
}]), updateWord);
router.delete('/words', authenticateToken, deleteWord);

module.exports = router;

