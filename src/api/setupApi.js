import api from 'api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const useFetchUniversities = () => {
  return useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const response = await api.get("/setup/universities");
      return response.data;
    },
  });
}

export const useFetchPositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await api.get("/setup/positions");
      return response.data;
    },
  });
}

export const useFetchMajors = () => {
  return useQuery({
    queryKey: ["majors"],
    queryFn: async () => {
      const response = await api.get("/setup/majors");
      return response.data;
    },
  });
}

export const useFetchCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await api.get("/setup/companies");
      return response.data;
    },
  });
}