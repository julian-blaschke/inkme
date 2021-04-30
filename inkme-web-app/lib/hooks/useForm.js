import { useMemo } from "react";
import { useForm as useReactHookForm } from "react-hook-form";
import { useToast } from "./useToast";

export function useForm(defaultValues, handler, successMsg = "done.", callback = () => {}) {
  const { register, handleSubmit, formState } = useReactHookForm({ defaultValues });
  const isSubmitting = useMemo(() => formState.isSubmitting, [formState.isSubmitting]);
  const toast = useToast();

  const handlerWrapper = async (values) => {
    try {
      await handler(values);
      toast("success", successMsg);
      callback();
    } catch ({ message }) {
      toast("error", message);
    }
  };

  const onSubmit = handleSubmit(handlerWrapper);

  return { register, isSubmitting, onSubmit };
}
