import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/common/libs/axios';
import { AcceptTermsRequest, AcceptTermsResponse } from './dto/accept-terms';

async function acceptTerms(data: AcceptTermsRequest) {
  const res = await axiosInstance.patch<AcceptTermsResponse>(
    '/user/acceptance-of-terms',
    data,
  );
  return res.data;
}

export function useAcceptTerms() {
  return useMutation({
    mutationFn: acceptTerms,
  });
}
