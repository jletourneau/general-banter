export default (client) => {

  const fetchPage = async ({ objectTypeSlug, leaderboard, params }) => {
    const fullParams = {
      fields: ['data'],
      owner_account_fields: ['identity', 'server_data'],
      ...params,
    };
    const response = await client.get(
      `/objects/types/${objectTypeSlug}/leaderboards/${leaderboard}/show`,
      { params: fullParams },
    );
    return response.data.leaders;
  };

  return {
    fetchPage,
  };

};
