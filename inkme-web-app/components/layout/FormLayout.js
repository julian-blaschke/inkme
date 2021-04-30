import { SimpleGrid } from "@chakra-ui/layout";

export function FormLayout({ children, onSubmit }) {
  return (
    <SimpleGrid columns={{ xl: 2 }} gap={16} rowGap={20} spacing="12" mt={12} as="form" onSubmit={onSubmit}>
      {children}
    </SimpleGrid>
  );
}
