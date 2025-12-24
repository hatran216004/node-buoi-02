const express = require('express');
const { commentController } = require('@/controllers');

const router = express.Router();

router.get('/', commentController.getAll);
router.post('/', commentController.createOne);

router.get('/:id', commentController.getOne);
router.put('/:id', commentController.updateOne);
router.delete('/:id', commentController.deleteOne);

module.exports = router;
