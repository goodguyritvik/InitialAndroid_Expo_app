const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = admin.firestore();

// GET /users - list all users
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = [];
    snapshot.forEach(doc => {
      users.push({ id: doc.id, ...doc.data() });
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /users/:id - get user by id
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('users').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /users - create new user
router.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const data = req.body;
    console.log('Attempting to add document to users collection...');
    const docRef = await db.collection('users').add(data);
    console.log('Document added successfully with ID:', docRef.id);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code,
      details: error.details,
      stack: error.stack 
    });
  }
});

// PUT /users/:id - update user by id
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    const docRef = db.collection('users').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    await docRef.update(data);
    res.json({ message: 'User updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /users/:id - delete user by id
router.delete('/:id', async (req, res) => {
  try {
    const docRef = db.collection('users').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    await docRef.delete();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
