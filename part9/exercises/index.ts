import express from 'express';
import { calculateBmi } from './calculateBmi';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const {height, weight} = req.query;
  let contentJson;
  if (!height || !weight) {
    contentJson = {error: "malformatted parameters"};
  } else {
    const bmi = calculateBmi(Number(height), Number(weight));
    contentJson = {weight,height,bmi}
  }
  res.end(JSON.stringify(contentJson));
})

app.post('/exercises', (req, res) => {
  const {daily_exercises, target} = req.body;
  if (!target || !daily_exercises) {
    res.status(400).json({error: "parameters missing"});
  } else if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    res.status(400).json({
      error: "malformatted parameters"
    });
  } else {
    res.json(exerciseCalculator(daily_exercises.map(dh => Number(dh)),Number(target)));
  }
  
})


const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});