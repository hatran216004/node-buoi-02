const express = require('express');
const { postController } = require('@/controllers');

const router = express.Router();

router.get('/', postController.getAll);
router.get('/:id', postController.getOne);

router.post('/', postController.createOne);
router.put('/:id', postController.updateOne);
router.delete('/:id', postController.deleteOne);

module.exports = router;
