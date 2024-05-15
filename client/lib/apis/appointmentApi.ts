import AxiosInstance from "../axios/AxiosInstanceClient";
import { Appointment } from "../types/appointments.type";

export interface GetAppointmentsPayload {
  orgId?: number;
  startDate?: Date;
  endDate?: Date;
  patientUserId?: number;
  doctorUserId?: number;
}

export const getAppointmentsApi = async (payload: GetAppointmentsPayload) => {
  let url = `/appointments`;
  return AxiosInstance.get<Appointment[]>(url, {
    params: payload,
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
