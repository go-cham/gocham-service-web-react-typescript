import { useMutation, useQueryClient } from '@tanstack/react-query';

import { EditPostRequest, EditPostResponse } from '@/apis/dto/posts/edit-post';
import { axiosInstance } from '@/libs/axios';

export default function useEditPost() {
  const queryClient = useQueryClient();
  const { mutate, data, isLoading, isSuccess, error } = useMutation({
    mutationKey: ['editPost'],
    mutationFn: async (data: EditPostRequest) => {
      const res = await axiosInstance.patch<EditPostResponse>(
        `/worries/${data.id}`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({
        queryKey: ['posts'],
      });
      queryClient.refetchQueries({
        queryKey: ['post', data.id],
      });
    },
  });

  return {
    editPost: mutate,
    data,
    isLoading,
    error,
    isSuccess,
  };
}