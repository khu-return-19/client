import api from 'api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export const useFetchUniversities = () => {
  return useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const response = await api.get("/api/setup/universities");
      return response.data;
    },
  });
}

export const useFetchPositions = () => {
  return useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const response = await api.get("/api/setup/positions");
      return response.data;
    },
  });
}

export const useFetchMajors = () => {
  return useQuery({
    queryKey: ["majors"],
    queryFn: async () => {
      const response = await api.get("/api/setup/majors");
      return response.data;
    },
  });
}

export const useFetchCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await api.get("/api/setup/companies");
      return response.data;
    },
  });
}