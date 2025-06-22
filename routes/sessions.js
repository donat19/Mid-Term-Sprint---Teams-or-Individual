const express = require('express');
const router = express.Router();
const db = require('../utils/database');

// GET all sessions
router.get('/', async (req, res) => {
  try {
    const sessions = await db.query(`
      SELECT s.*, 
             c.name as conference_name,
             sp.first_name, sp.last_name, sp.company,
             COUNT(sa.attendee_id) as registered_attendees
      FROM sessions s
      JOIN conferences c ON s.conference_id = c.conference_id
      JOIN speakers sp ON s.speaker_id = sp.speaker_id
      LEFT JOIN session_attendance sa ON s.session_id = sa.session_id
      GROUP BY s.session_id
      ORDER BY s.session_date, s.start_time
    `);
    res.json(sessions);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// GET specific session
router.get('/:id', async (req, res) => {
  try {
    const session = await db.query(`
      SELECT s.*, 
             c.name as conference_name,
             sp.first_name, sp.last_name, sp.email, sp.company, sp.bio
      FROM sessions s
      JOIN conferences c ON s.conference_id = c.conference_id
      JOIN speakers sp ON s.speaker_id = sp.speaker_id
      WHERE s.session_id = ?
    `, [req.params.id]);
    
    if (session.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Get attendees for this session
    const attendees = await db.query(`
      SELECT a.*, sa.attended, sa.registered_at
      FROM session_attendance sa
      JOIN attendees a ON sa.attendee_id = a.attendee_id
      WHERE sa.session_id = ?
      ORDER BY a.last_name, a.first_name
    `, [req.params.id]);

    res.json({
      ...session[0],
      attendees
    });
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// POST new session
router.post('/', async (req, res) => {
  try {
    const { conference_id, speaker_id, title, description, session_date, start_time, end_time, room, max_capacity } = req.body;
    
    if (!conference_id || !speaker_id || !title || !session_date || !start_time || !end_time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.run(`
      INSERT INTO sessions (conference_id, speaker_id, title, description, session_date, start_time, end_time, room, max_capacity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [conference_id, speaker_id, title, description, session_date, start_time, end_time, room, max_capacity || 50]);

    const newSession = await db.query(`
      SELECT s.*, 
             c.name as conference_name,
             sp.first_name, sp.last_name, sp.company
      FROM sessions s
      JOIN conferences c ON s.conference_id = c.conference_id
      JOIN speakers sp ON s.speaker_id = sp.speaker_id
      WHERE s.session_id = ?
    `, [result.id]);

    res.status(201).json(newSession[0]);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// PUT update session
router.put('/:id', async (req, res) => {
  try {
    const { conference_id, speaker_id, title, description, session_date, start_time, end_time, room, max_capacity } = req.body;
    
    const result = await db.run(`
      UPDATE sessions 
      SET conference_id = ?, speaker_id = ?, title = ?, description = ?, session_date = ?, start_time = ?, end_time = ?, room = ?, max_capacity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE session_id = ?
    `, [conference_id, speaker_id, title, description, session_date, start_time, end_time, room, max_capacity, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const updatedSession = await db.query(`
      SELECT s.*, 
             c.name as conference_name,
             sp.first_name, sp.last_name, sp.company
      FROM sessions s
      JOIN conferences c ON s.conference_id = c.conference_id
      JOIN speakers sp ON s.speaker_id = sp.speaker_id
      WHERE s.session_id = ?
    `, [req.params.id]);

    res.json(updatedSession[0]);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({ error: 'Failed to update session' });
  }
});

// DELETE session
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run(
      'DELETE FROM sessions WHERE session_id = ?',
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

module.exports = router;