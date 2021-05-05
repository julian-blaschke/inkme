import { useForeGroundColorValue } from "@/styles/theme";
import { Avatar as ChakraAvatar, AvatarGroup } from "@chakra-ui/avatar";

export function Avatar({ img, size, badge }) {
  const borderColor = useForeGroundColorValue();
  return (
    <AvatarGroup spacing={-6} max={2} borderRadius="md" bg="transparent" size={size}>
      {Array.isArray(img) ? (
        img.slice(0, 3).map((src, index) => <ChakraAvatar borderRadius="md" borderColor={borderColor} src={src} key={index} />)
      ) : (
        <ChakraAvatar borderRadius="md" borderColor={borderColor} src={img} children={badge} />
      )}
    </AvatarGroup>
  );
}
