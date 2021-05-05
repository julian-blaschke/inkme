import { Center, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useMemo } from "react";
import { ListItem } from "./ListItem";

/**
 *
 * @param {string} title list heading
 * @returns {Heading} Header component of List Component
 */
function Header({ title }) {
  return (
    <Heading as="h3" fontStyle="italic" fontWeight="black" fontSize="sm">
      {title}
    </Heading>
  );
}

/**
 *
 * @param {Array} data an array of objects mapped to be passed to {ListItem} component
 * @param {boolean} isLoading state of data fetching
 * @param {number} maxCols number between 1 & 3, determining the maximum columns on the GridLayout component that is parent to the ListItem components
 * @returns either Spinner-, SimpleGrid-, or empty component
 */
function ListContent({ data, isLoading, maxCols = 2 }) {
  // if data is fetching we return a loading indicator
  // center is of exact height of one row of ListItem children
  if (isLoading) return <Center height="72px" children={<Spinner />} />;
  // data fetched
  // if data is empty render epmtyMessage
  if (!data || data.length < 1) return <></>;

  // colums depend on both screen size & maxCols arg
  const md = useMemo(() => (maxCols > 1 ? 2 : 1), [maxCols]);
  const xl = useMemo(() => (maxCols > 2 ? 3 : maxCols > 1 ? 2 : 1), [maxCols]);

  // map over data entrys & render ListItems
  return (
    <SimpleGrid spacing={6} columns={{ base: 1, md, xl }}>
      {data.map((entry, index) => (
        <ListItem key={index} {...entry} />
      ))}
    </SimpleGrid>
  );
}

/**
 * main component used for data display of collections of artists, shops, invites or guestspots.
 *
 * @param {string} id for anchor links referencing this list
 * @param {string} title
 * @returns {Flex} component
 */
export function List({ id, title, data, isLoading, maxCols }) {
  return (
    <Stack spacing={6} py={6}>
      <Header title={title} />
      <ListContent data={data} isLoading={isLoading} maxCols={maxCols} />
    </Stack>
  );
}
