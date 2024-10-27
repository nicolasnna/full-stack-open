
export const calculateBmi = (height: number, weight: number) => {
  if (weight <= 0) {
    return "Error - weight cannot be 0 or less";
  }
  if (height <= 0) {
    return "Error - height cannot be 0 or less";
  }
  const heightMeters = height / 100;
  const imc = weight / (heightMeters*heightMeters);
  if (imc < 18.5) {
    return "Low weigth for height";
  } else if (imc < 24.99) {
    return "Normal (healthy weight)";
  } else if (imc < 30) {
    return "Overweight (bad weight)";
  } else {
    return "Obesity (too poor weight)";
  }
} 

interface processValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): processValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

try { 
  const {height, weight} = parseArguments(process.argv);
  console.log(calculateBmi(height,weight))
} catch (error: unknown) {
  let errorMessage = "Something bad happend."
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage)
}