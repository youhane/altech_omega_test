const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const prisma = new PrismaClient();

// Get All Users
app.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { id: 'asc' } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// POST Endpoint to Create User By User ID
app.post('/user', async (req, res) => {
  try {
    const { first_name, last_name, birthday, location } = req.body;

    const newUser = await prisma.user.create({
      data: {
        id: uuidv4(), // Manually generate UUID
        firstName: first_name,
        lastName: last_name,
        birthday: new Date(birthday),
        location: location,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// DELETE Endpoint to Delete User By User ID
app.delete('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });

    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

// PUT Endpoint to Update User By User ID
app.put('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { first_name, last_name, birthday, location } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: first_name,
        lastName: last_name,
        birthday: new Date(birthday),
        location: location,
      },
    });

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

// Cron Job to send birthday messages at 9am today, if the users birthday match
cron.schedule('0 9 * * *', async () => {
  const today = new Date();
  // Find and Select the Users where their birthday is today
  const users = await pool.query('SELECT * FROM users WHERE EXTRACT(MONTH FROM birthday) = $1 AND EXTRACT(DAY FROM birthday) = $2', [today.getMonth() + 1, today.getDate()]);

  // For every user found, the cron job will make a post request containing the message to the pipedream endpoint
  for (const user of users.rows) {
    const message = `Hey, ${user.first_name} ${user.last_name}, it's your birthday!`;
    try {
      await axios.post('https://endpqoh4zrucg.x.pipedream.net', { message });
      console.log(`Message sent to ${user.first_name}`);
    } catch (error) {
      console.error(`Error sending message to ${user.first_name}: ${error.message}`);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
