interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


export const exerciseCalculator = (exercisesForDays: Array<number>, hoursGoal: number): Result => {
  const periodLength = exercisesForDays.length;
  const trainingDays = exercisesForDays.filter(d => d > 0).length;
  const totalHours = exercisesForDays.reduce((hour, acc) => hour + acc, 0);
  const average = totalHours / periodLength;

  const target = hoursGoal
  const success = average >= target;

  let rating;
  let ratingDescription; 

  if (average >= target) {
    rating = 3;
    ratingDescription = "Success, you complete hours of exercises";
  } else if (average>= target*0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = "You dont complete goal, need improve you discipline";
  }
  return {periodLength, trainingDays, success, rating, ratingDescription, target, average}
}

interface processValuesExercise {
  hoursGoal: number;
  exerciseForDay: Array<number>;
}

export const parseArgumentsExercise = (args: string[]): processValuesExercise => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const exercisesArray = args.filter((_d,index) => index >= 3);

  if (exercisesArray.every(value => !isNaN(Number(value))) && !isNaN(Number(args[2]))) {
    return {
      hoursGoal: Number(args[2]),
      exerciseForDay: exercisesArray.map(e => Number(e))
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try {
  const {hoursGoal, exerciseForDay} = parseArgumentsExercise(process.argv);
  console.log(exerciseCalculator(exerciseForDay, hoursGoal))
} catch (error: unknown) {
  let errorMessage = "Something bad happend."
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}

// console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))