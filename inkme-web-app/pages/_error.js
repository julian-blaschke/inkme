import { DashboardLayout } from "@/components/DashboardLayout";
import { Text } from "@chakra-ui/layout";

function Error({ statusCode }) {
  return (
    <DashboardLayout title="something went wrong...">
      <Text>An {statusCode} error has occured.</Text>
    </DashboardLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
