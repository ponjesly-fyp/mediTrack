type NutrientIntake = {
  protein: number
  carbs: number
  fats: number
  calories: number
  fluids: number
}

type Patient = {
  patientName: string
  department: string
  status: string
  bedId: string
  age: string
  gender: string
  weight: number
  height: number
  bloodGroup: string
  allergies: string[]
  dietaryRestrictions: string
  nutrientIntake: NutrientIntake
}

export const patientData: Record<string, Patient> = {
  "1": {
    patientName: "Akash T",
    department: "Cardiology",
    status: "stable",
    bedId: "A-101",
    age: "21",
    gender: "Male",
    weight: 58,
    height: 172,
    bloodGroup: "B+",
    allergies: ["Penicillin"],
    dietaryRestrictions: "Low sodium",
    nutrientIntake: { protein: 48, carbs: 180, fats: 40, calories: 1300, fluids: 1400 }
  },
  "2": {
    patientName: "Aswin W",
    department: "Neurology",
    status: "attention",
    bedId: "A-102",
    age: "21",
    gender: "Male",
    weight: 63,
    height: 175,
    bloodGroup: "O+",
    allergies: ["Gluten"],
    dietaryRestrictions: "Low sugar",
    nutrientIntake: { protein: 50, carbs: 160, fats: 38, calories: 1250, fluids: 1350 }
  },
  "3": {
    patientName: "Winnko",
    department: "Oncology",
    status: "critical",
    bedId: "A-103",
    age: "22",
    gender: "Male",
    weight: 60,
    height: 168,
    bloodGroup: "A+",
    allergies: ["Sulfa"],
    dietaryRestrictions: "Low fat",
    nutrientIntake: { protein: 42, carbs: 150, fats: 30, calories: 1100, fluids: 1250 }
  },
  "4": {
    patientName: "Jaswanth",
    department: "Pulmonology",
    status: "stable",
    bedId: "A-104",
    age: "21",
    gender: "Male",
    weight: 67,
    height: 178,
    bloodGroup: "AB+",
    allergies: ["Pollen"],
    dietaryRestrictions: "None",
    nutrientIntake: { protein: 46, carbs: 190, fats: 42, calories: 1350, fluids: 1500 }
  },
  "5": {
    patientName: "Robert Wilson",
    department: "Orthopedics",
    status: "attention",
    bedId: "B-101",
    age: "41",
    gender: "Male",
    weight: 82,
    height: 181,
    bloodGroup: "B-",
    allergies: [],
    dietaryRestrictions: "Low sodium",
    nutrientIntake: { protein: 55, carbs: 200, fats: 45, calories: 1400, fluids: 1600 }
  },
  "6": {
    patientName: "Jennifer Lee",
    department: "Cardiology",
    status: "stable",
    bedId: "B-102",
    age: "29",
    gender: "Female",
    weight: 59,
    height: 164,
    bloodGroup: "O+",
    allergies: ["Dust"],
    dietaryRestrictions: "Low cholesterol",
    nutrientIntake: { protein: 44, carbs: 170, fats: 36, calories: 1200, fluids: 1450 }
  },
  "7": {
    patientName: "David Martinez",
    department: "Neurology",
    status: "critical",
    bedId: "B-103",
    age: "52",
    gender: "Male",
    weight: 90,
    height: 183,
    bloodGroup: "A-",
    allergies: ["Seafood"],
    dietaryRestrictions: "Low carb",
    nutrientIntake: { protein: 58, carbs: 130, fats: 40, calories: 1250, fluids: 1550 }
  },
  "8": {
    patientName: "Lisa Anderson",
    department: "Oncology",
    status: "stable",
    bedId: "B-104",
    age: "72",
    gender: "Female",
    weight: 68,
    height: 160,
    bloodGroup: "AB-",
    allergies: ["Latex"],
    dietaryRestrictions: "Diabetic-friendly",
    nutrientIntake: { protein: 41, carbs: 140, fats: 33, calories: 1150, fluids: 1300 }
  }
}
