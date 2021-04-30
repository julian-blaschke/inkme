import { primaryColorScheme } from "@/styles/theme";
import { Button } from "@chakra-ui/button";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/form-control";
import { Switch } from "@chakra-ui/switch";
import { useForm } from "react-hook-form";
import { FormLayout } from "../layout/FormLayout";

export function AppearanceSettingsForm({ defaultValues }) {
  const { register, handleSubmit, formState } = useForm({ defaultValues });

  async function handler({ useSystemColorMode }) {
    //TODO: make local storage hook to store this
  }

  return (
    <FormLayout onSubmit={handleSubmit(handler)}>
      <FormControl>
        <FormLabel>Use system color mode</FormLabel>
        <Switch size="lg" colorScheme={primaryColorScheme} name="useSystemColorMode" ref={register()} />
        <FormHelperText>Dark-/Light mode will adjust according to your system's settings.</FormHelperText>
      </FormControl>
      <Button
        alignSelf={{ xl: "end" }}
        justifySelf={{ xl: "end" }}
        px={20}
        type="submit"
        colorScheme={primaryColorScheme}
        variant="solid"
        isLoading={formState.isSubmitting}
      >
        save
      </Button>
    </FormLayout>
  );
}
