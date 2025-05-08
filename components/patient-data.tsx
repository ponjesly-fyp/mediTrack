type Patient = {
    patientName: string
    department: string
    status: string
    bedId: string
    age: string
    gender: string
}
export const patientData:Record<string,Patient> = {
    "1": { patientName: "Akash T", department: "Cardiology", status: "stable", bedId: "A-101",age:"21",gender:"Male" },
    "2": { patientName: "Aswin W", department: "Neurology", status: "attention", bedId: "A-102",age:"21",gender:"Trans"},
    "3": { patientName: "Winnko", department: "Oncology", status: "critical", bedId: "A-103",age:"22",gender:"Male" },
    "4": { patientName: "Jaswanth", department: "Pulmonology", status: "stable", bedId: "A-104",age:"21",gender:"Male" },
    "5": { patientName: "Robert Wilson", department: "Orthopedics", status: "attention", bedId: "B-101",age:"41",gender:"Male" },
    "6": { patientName: "Jennifer Lee", department: "Cardiology", status: "stable", bedId: "B-102",age:"29",gender:"Female" },
    "7": { patientName: "David Martinez", department: "Neurology", status: "critical", bedId: "B-103",age:"52",gender:"Male"},
    "8": { patientName: "Lisa Anderson", department: "Oncology", status: "stable", bedId: "B-104",age:"72",gender:"Female"},
};
  