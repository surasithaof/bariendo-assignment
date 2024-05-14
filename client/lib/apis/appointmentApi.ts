import AxiosInstance from "../axios/AxiosInstanceClient";
import { Appointment } from "../types/appointments.type";

export const getAppointmentsApi = async (
  orgId?: number,
  startDate?: Date,
  endDate?: Date,
  patientUserId?: number,
  doctorUserId?: number
) => {
  let url = `/appointments`;
  return AxiosInstance.get<Appointment[]>(url, {
    params: {
      orgId,
      startDate,
      endDate,
      patientUserId,
      doctorUserId,
    },
  });
};

export const getAppointmentByIdApi = async (appointmentId: number) => {
  let url = `/appointments/${appointmentId}`;

  return AxiosInstance.get<Appointment>(url);
};

export const createAppointmentApi = async (
  date: Date,
  organizationId: number,
  patientId: number,
  doctorId: number
) => {
  return AxiosInstance.post<Appointment>("/appointments", {
    date: date.toISOString(),
    organizationId,
    patientId,
    doctorId,
  });
};
