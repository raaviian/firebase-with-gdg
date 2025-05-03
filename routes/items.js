// routes/items.js
import express from 'express';
import { db } from '../firebaseAdminConfig.js';

const router = express.Router();
const coll   = db.collection('items');  // Admin-SDK style

// LIST
router.get('/', async (req, res) => {
  try {
    const snap = await coll.get();
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const ref = await coll.add(req.body);
    res.status(201).json({ id: ref.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ
router.get('/:id', async (req, res) => {
  try {
    const docRef = coll.doc(req.params.id);
    const snap   = await docRef.get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });
    res.json({ id: snap.id, ...snap.data() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const docRef = coll.doc(req.params.id);
    await docRef.set(req.body, { merge: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await coll.doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
