import AxiosInstance from "../axios/AxiosInstanceClient";
import { Appointment } from "../types/appointments.type";
import { Paging } from "../types/shared.type";

export const getAppointmentsApi = async (
  orgId: number,
  startDate: Date,
  endDate: Date
) => {
  const url = `/appointments?orgId=${orgId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
  return AxiosInstance.get<Paging<Appointment>>(url);
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
