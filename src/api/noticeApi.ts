import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "api/axiosInstance";

// NOTE: 공지사항 목록에 사용될 개별 공지사항의 타입
export interface NoticeListItem {
  id: number;
  title: string;
  modifiedAt: string;
}

// NOTE: 공지사항 목록 조회 API의 전체 응답 타입
export interface NoticesResponse {
  notices: NoticeListItem[];
  total: number;
  page: number;
}

// NOTE: 공지사항 상세 정보 타입 (내용 포함)
export interface NoticeDetail {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

// NOTE: 공지사항 목록 조회
export const useFetchNotices = (page: number, size: number) => {
  return useQuery<NoticesResponse, Error>({
    queryKey: ["notices", page, size],
    queryFn: async () => {
      const response = await api.get<NoticesResponse>("/notice", {
        params: { page, size },
      });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

// NOTE: 특정 공지사항 조회
export const useFetchNotice = (id: number | string | undefined) => {
  return useQuery<NoticeDetail, Error>({
    queryKey: ["notice", id],
    queryFn: async () => {
      const response = await api.get<NoticeDetail>(`/notice/${id}`);
      return response.data;
    },
    enabled: !!id, // id가 있을 때만 요청 실행
  });
};

// NOTE: 공지사항 등록, 수정, 제거 기능 백엔드에서 처리(로그인 기능 없어지면서 프론트에서는 처리 x)

// // NOTE: 공지사항 등록
// export const useCreateNotice = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (noticeData) => {
//       const response = await api.post("/notice", noticeData);
//       return response.data;
//     },
//     onSuccess: () => {
//       // 새로운 공지가 추가되었을 때 기존 리스트를 갱신
//       queryClient.invalidateQueries(["notices"]);
//     },
//   });
// };

// // NOTE: 공지사항 삭제
// export const useDeleteNotice = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (id) => {
//       const response = await api.delete("/notice", {
//         data: { id },
//       });
//       return response.data;
//     },
//     onSuccess: () => {
//       // 공지 삭제 후 공지 목록 갱신
//       queryClient.invalidateQueries(["notices"]);
//     },
//   });
// };

// // NOTE: 공지사항 수정
// export const useUpdateNotice = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, title, content }) => {
//       const response = await api.patch("/notice", { id, title, content });
//       return response.data;
//     },
//     onSuccess: () => {
//       // 공지 수정 후 공지 목록 갱신
//       queryClient.invalidateQueries(["notices"]);
//     },
//   });
// };
