import { IconButton } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { GitHub } from "react-feather";

export function GithubButton() {
  const { push } = useRouter();
  const handler = () => push("https://github.com/kingjulien1/inkme");
  return <IconButton aria-label="icon" icon={<GitHub size={16} />} size="sm" variant="ghost" onClick={handler} />;
}
