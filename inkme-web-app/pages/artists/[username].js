import { admin } from "@/firebase/admin";

export default function Artist({ artist }) {
  console.log(artist);
  return <></>;
}

export async function getStaticProps(context) {
  const { username } = context.params;

  const doc = admin.firestore().collection("artists").doc(username);
  const artist = await doc.get();
  if (!artist.exists) return { notFound: true };

  return { props: { artist: { ...artist.data(), username: doc.id } } };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
