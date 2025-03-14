const express = require('express');
const router = express.Router();
const {
    createAssociation,
  getAllAssociations,
  getAssociationById,
  updateAssociation,
  deleteAssociation
} = require('../Controller/associationController');


//
router.post('/create',createAssociation);
router.get('/associations', getAllAssociations);
router.get('/associations/:id', getAssociationById);
router.put('/associations/:id', updateAssociation);
router.delete('/associations/:id', deleteAssociation);

module.exports = router;