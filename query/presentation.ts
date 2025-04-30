import { generatePerformanceFeedback } from "@/actions/feedback";
import { getfeedbackbyId } from "@/actions/feedbackbyid";
import { getallPpt } from "@/actions/getallppt";
import { getCurrentppt } from "@/actions/getCurrentPpt";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export async function uploadppt(file: File) {
  try {
    const formdata = new FormData();
    formdata.append("file", file);
    const response = await fetch("/api/parseppt", {
      method: "POST",
      body: formdata,
    });
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(error.Message);
    throw new Error("internal server error");
  }
}
export function useGetCurrentPpt(id: string) {
  return useQuery({
    queryKey: ["currentPpt", id],
    queryFn: () => getCurrentppt(id),
    enabled: !!id,
  });
}

export function useGetAllPpt() {
  return useQuery({
    queryKey: ["allPpt"],
    queryFn: getallPpt,
  });
}
export function useUploadppt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadppt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allpt"] });
    },
  });
}

export function useGenerateFeedback() {
  return useMutation({
    mutationFn: ({ feedbackInput, id }: { feedbackInput: FormData; id: string }) =>
      generatePerformanceFeedback({ feedbackInput, id }),
  });
}

export function useGetFeedbackById(id: string) {
  return useQuery({
    queryKey: ["feedbackById", id],
    queryFn: () => getfeedbackbyId(id),
    enabled: !!id,
  });
}