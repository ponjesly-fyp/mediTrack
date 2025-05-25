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
  "R-100": {
    patientName: "Akash T",
    department: "Cardiology",
    status: "stable",
    bedId: "R-100",
    age: "21",
    gender: "Male",
    weight: 58,
    height: 172,
    bloodGroup: "B+",
    allergies: ["Penicillin"],
    dietaryRestrictions: "Low sodium",
    nutrientIntake: { protein: 48, carbs: 180, fats: 40, calories: 1300, fluids: 1400 }
  },
  "R-101": {
    patientName: "Aswin W",
    department: "Neurology",
    status: "attention",
    bedId: "R-101",
    age: "21",
    gender: "Male",
    weight: 63,
    height: 175,
    bloodGroup: "O+",
    allergies: ["Gluten"],
    dietaryRestrictions: "Low sugar",
    nutrientIntake: { protein: 50, carbs: 160, fats: 38, calories: 1250, fluids: 1350 }
  },
  "R-102": {
    patientName: "Winnko",
    department: "Oncology",
    status: "critical",
    bedId: "R-102",
    age: "22",
    gender: "Male",
    weight: 60,
    height: 168,
    bloodGroup: "A+",
    allergies: ["Sulfa"],
    dietaryRestrictions: "Low fat",
    nutrientIntake: { protein: 42, carbs: 150, fats: 30, calories: 1100, fluids: 1250 }
  },
  "R-103": {
    patientName: "Jaswanth",
    department: "Pulmonology",
    status: "stable",
    bedId: "R-103",
    age: "21",
    gender: "Male",
    weight: 67,
    height: 178,
    bloodGroup: "AB+",
    allergies: ["Pollen"],
    dietaryRestrictions: "None",
    nutrientIntake: { protein: 46, carbs: 190, fats: 42, calories: 1350, fluids: 1500 }
  },
  "R-104": {
    patientName: "Robert Wilson",
    department: "Orthopedics",
    status: "attention",
    bedId: "R-104",
    age: "41",
    gender: "Male",
    weight: 82,
    height: 181,
    bloodGroup: "B-",
    allergies: [],
    dietaryRestrictions: "Low sodium",
    nutrientIntake: { protein: 55, carbs: 200, fats: 45, calories: 1400, fluids: 1600 }
  },
  "R-105": {
    patientName: "Jennifer Lee",
    department: "Cardiology",
    status: "stable",
    bedId: "R-105",
    age: "29",
    gender: "Female",
    weight: 59,
    height: 164,
    bloodGroup: "O+",
    allergies: ["Dust"],
    dietaryRestrictions: "Low cholesterol",
    nutrientIntake: { protein: 44, carbs: 170, fats: 36, calories: 1200, fluids: 1450 }
  },
}
