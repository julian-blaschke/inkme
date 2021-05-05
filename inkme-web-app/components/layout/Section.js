import { Box, Flex, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { useMemo } from "react";

/**
 *
 * @param {string} title
 * @param {string} href what section to reference
 * @param {"h1" || "h2" || "h3" } variant heading type/fontSize
 * @returns Flex component with heading and anchor referencing section id
 */
export function AnchoredHeading({ title, id, variant = "h2" }) {
  const fontSize = useMemo(() => (variant === "h1" ? "4xl" : variant === "h2" ? "2xl" : "xl"), [variant]);
  const href = `#${id}`;

  return (
    <Flex align="center" position="relative">
      {id && (
        <Link href={href} position="absolute" left={{ md: -30 }} fontWeight="black" _hover={{ textDecoration: "none" }} children={href && "🔗"} />
      )}
      <Heading fontSize={fontSize} fontWeight="black">
        {title}
      </Heading>
    </Flex>
  );
}

/**
 *
 * @param {string} title
 * @param {string} subtitle
 * @param {string} id what section to reference
 * @param {Component} rightElement  element on the right/top of the anchored header
 * @returns Flex component with heading and anchor referencing section id
 */
function SectionHeader({ title, subtitle, variant, id, rightElement }) {
  return (
    <Stack isInline borderBottomWidth={1} justify="space-between" spacing={4} pb={4} width="full">
      <Box>
        <AnchoredHeading title={title} variant={variant} id={id} />
        <Text fontSize="sm">{subtitle}</Text>
      </Box>
      {rightElement}
    </Stack>
  );
}

/**
 *
 * @param {string} id to reference the section with anchor links
 * @param {string} title heading of this section
 * @returns
 */
export function Section({ id, title, variant, subtitle, rightElement, children }) {
  //offset padding & margin to adjust anchor link
  return (
    <Stack px={{ sm: 4, md: 12, lg: 20 }} pt={16} mt={-16} id={id} flexDir="column" as="section" spacing={6}>
      <SectionHeader title={title} subtitle={subtitle} variant={variant} rightElement={rightElement} id={id} />
      {children}
    </Stack>
  );
}
