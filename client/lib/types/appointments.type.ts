import { Doctor } from "./doctor.type";
import { Organization } from "./org.type";

export interface Appointment {
  id: number;
  patientId: number;
  doctor: Doctor;
  doctorId: number;
  organization: Organization;
  organizationId: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}
