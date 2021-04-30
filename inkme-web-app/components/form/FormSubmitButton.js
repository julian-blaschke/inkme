import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";

export function FormSubmitButton({ title = "submit", isSubmitting }) {
  return (
    <Button
      alignSelf={{ xl: "end" }}
      justifySelf={{ xl: "end" }}
      px={20}
      type="submit"
      colorScheme={primaryColorScheme}
      variant="solid"
      isLoading={isSubmitting}
    >
      {title}
    </Button>
  );
}
