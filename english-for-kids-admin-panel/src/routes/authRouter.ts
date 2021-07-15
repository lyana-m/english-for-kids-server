const Router = require('express');
const router = new Router();
const login = require('./authController');
var multer = require('multer')
import { authenticateToken } from '../helpers/helpers';
import { createWord, getCategories, getWords } from './dataController';

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
router.get('/words', authenticateToken, getWords);
router.post("/words", upload.fields([{
  name: 'image',
  maxCount: 1
}, {
  name: 'audio',
  maxCount: 1
}]), createWord);

module.exports = router;

