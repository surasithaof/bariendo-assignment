import AxiosInstance from "../axios/AxiosInstanceClient";
import { Doctor } from "../types/doctor.type";

export const getDoctorsApi = async (orgId: number) => {
  return AxiosInstance.get<Doctor[]>(`/doctors?orgId=${orgId}`);
};
