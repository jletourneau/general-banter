export default (client) => {

  const getBySlug = async ({ slug, accountId }) => {
    const response = await client.get(`/profiles/${accountId}/inventory/bulk/${slug}`);
    return response.data[0];
  };

  return {
    getBySlug,
  };

};
