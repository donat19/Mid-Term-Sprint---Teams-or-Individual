const express = require('express');
const router = express.Router();
const db = require('../utils/database');

// GET all attendees
router.get('/', async (req, res) => {
  try {
    const attendees = await db.query(`
      SELECT a.*, 
             COUNT(DISTINCT cr.conference_id) as conferences_registered,
             COUNT(DISTINCT sa.session_id) as sessions_registered
      FROM attendees a
      LEFT JOIN conference_registrations cr ON a.attendee_id = cr.attendee_id
      LEFT JOIN session_attendance sa ON a.attendee_id = sa.attendee_id
      GROUP BY a.attendee_id
      ORDER BY a.last_name, a.first_name
    `);
    res.json(attendees);
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ error: 'Failed to fetch attendees' });
  }
});

// GET specific attendee
router.get('/:id', async (req, res) => {
  try {
    const attendee = await db.query(
      'SELECT * FROM attendees WHERE attendee_id = ?',
      [req.params.id]
    );
    
    if (attendee.length === 0) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    // Get conferences for this attendee
    const conferences = await db.query(`
      SELECT c.*, cr.registration_date, cr.status
      FROM conference_registrations cr
      JOIN conferences c ON cr.conference_id = c.conference_id
      WHERE cr.attendee_id = ?
      ORDER BY c.start_date
    `, [req.params.id]);

    // Get sessions for this attendee
    const sessions = await db.query(`
      SELECT s.*, sa.attended, sa.registered_at, c.name as conference_name
      FROM session_attendance sa
      JOIN sessions s ON sa.session_id = s.session_id
      JOIN conferences c ON s.conference_id = c.conference_id
      WHERE sa.attendee_id = ?
      ORDER BY s.session_date, s.start_time
    `, [req.params.id]);

    res.json({
      ...attendee[0],
      conferences,
      sessions
    });
  } catch (error) {
    console.error('Error fetching attendee:', error);
    res.status(500).json({ error: 'Failed to fetch attendee' });
  }
});

// POST new attendee
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, company } = req.body;
    
    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await db.run(`
      INSERT INTO attendees (first_name, last_name, email, phone, company)
      VALUES (?, ?, ?, ?, ?)
    `, [first_name, last_name, email, phone, company]);

    const newAttendee = await db.query(
      'SELECT * FROM attendees WHERE attendee_id = ?',
      [result.id]
    );

    res.status(201).json(newAttendee[0]);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error creating attendee:', error);
    res.status(500).json({ error: 'Failed to create attendee' });
  }
});

// PUT update attendee
router.put('/:id', async (req, res) => {
  try {
    const { first_name, last_name, email, phone, company } = req.body;
    
    const result = await db.run(`
      UPDATE attendees 
      SET first_name = ?, last_name = ?, email = ?, phone = ?, company = ?, updated_at = CURRENT_TIMESTAMP
      WHERE attendee_id = ?
    `, [first_name, last_name, email, phone, company, req.params.id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    const updatedAttendee = await db.query(
      'SELECT * FROM attendees WHERE attendee_id = ?',
      [req.params.id]
    );

    res.json(updatedAttendee[0]);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('Error updating attendee:', error);
    res.status(500).json({ error: 'Failed to update attendee' });
  }
});

// DELETE attendee
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.run(
      'DELETE FROM attendees WHERE attendee_id = ?',
      [req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Attendee not found' });
    }

    res.json({ message: 'Attendee deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendee:', error);
    res.status(500).json({ error: 'Failed to delete attendee' });
  }
});

// POST register attendee for conference
router.post('/:id/register/:conferenceId', async (req, res) => {
  try {
    const { id: attendeeId, conferenceId } = req.params;
    
    const result = await db.run(`
      INSERT INTO conference_registrations (conference_id, attendee_id, status)
      VALUES (?, ?, 'registered')
    `, [conferenceId, attendeeId]);

    res.status(201).json({ message: 'Successfully registered for conference' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Already registered for this conference' });
    }
    console.error('Error registering for conference:', error);
    res.status(500).json({ error: 'Failed to register for conference' });
  }
});

// POST register attendee for session
router.post('/:id/sessions/:sessionId', async (req, res) => {
  try {
    const { id: attendeeId, sessionId } = req.params;
    
    const result = await db.run(`
      INSERT INTO session_attendance (session_id, attendee_id, attended)
      VALUES (?, ?, FALSE)
    `, [sessionId, attendeeId]);

    res.status(201).json({ message: 'Successfully registered for session' });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Already registered for this session' });
    }
    console.error('Error registering for session:', error);
    res.status(500).json({ error: 'Failed to register for session' });
  }
});

module.exports = router;