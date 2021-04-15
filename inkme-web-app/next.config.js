module.exports = {
  async redirects() {
    return [
      {
        source: "/artists",
        destination: "/",
        permanent: true,
      },
      {
        source: "/shops",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
