const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockProfiles = [
  { id: '1', name: 'John', age: 28, bio: 'Coffee lover and hiker', photoUrl: 'https://fastly.picsum.photos/id/1/600/800.jpg?hmac=1UH7aH-yUEO8Tq9xKGOCLEyEfu_ZwlxuKm-E8DhKWK8' },
  { id: '2', name: 'Peter', age: 30, bio: 'Tech enthusiast and foodie', photoUrl: 'https://fastly.picsum.photos/id/2/600/800.jpg?hmac=l6HtoiTSJB0VpmX8JZ-btrlKEwBbmMoEIIvAUfTE2-U' },
  { id: '3', name: 'Lilla', age: 25, bio: 'Traveler and photographer', photoUrl: 'https://fastly.picsum.photos/id/3/600/800.jpg?hmac=GjdiWL3rsgSPUXByiagSgkVo2kdcT3muLeb5EQN8DLc' },
  { id: '4', name: 'Marco', age: 32, bio: 'Music producer and DJ', photoUrl: 'https://fastly.picsum.photos/id/4/600/800.jpg?hmac=wSAbUWXRJDtaQtC6BMYvnInelxuZqQIpEy2I2T8QPP0' },
  { id: '5', name: 'Sofia', age: 27, bio: 'Yoga instructor and artist', photoUrl: 'https://fastly.picsum.photos/id/1/600/800.jpg?hmac=1UH7aH-yUEO8Tq9xKGOCLEyEfu_ZwlxuKm-E8DhKWK8' }
];

let currentProfileIndex = 0;

// GET /profiles/next - Get next profile
app.get('/profiles/next', (req, res) => {
  if (currentProfileIndex >= mockProfiles.length) {
    return res.status(204).send(); // No more profiles
  }
  
  const profile = mockProfiles[currentProfileIndex];
  res.json(profile);
});

// POST /profiles/:id/decide - Make a decision on a profile
app.post('/profiles/:id/decide', (req, res) => {
  const { id } = req.params;
  const { decision } = req.body;
  
  if (!decision || !['like', 'dislike'].includes(decision)) {
    return res.status(400).json({ error: 'Invalid decision. Must be "like" or "dislike"' });
  }
  
  // Simple matching logic: even-aged profiles like you back
  const profile = mockProfiles.find(p => p.id === id);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  const matched = decision === 'like' && profile.age % 2 === 0;
  
  // Move to next profile after decision
  currentProfileIndex = Math.min(currentProfileIndex + 1, mockProfiles.length);
  
  res.json({ matched });
});

// Reset endpoint to restart from beginning
app.post('/profiles/reset', (req, res) => {
  currentProfileIndex = 0;
  res.json({ message: 'Profiles reset successfully' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📱 Available endpoints:`);
  console.log(`   GET  /profiles/next`);
  console.log(`   POST /profiles/:id/decide`);
  console.log(`   POST /profiles/reset`);
  console.log(`   GET  /health`);
});
