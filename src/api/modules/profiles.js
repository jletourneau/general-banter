export default (client) => {

  const list = async (params) => {
    const response = await client.get('/profiles/list', { params });
    const { users } = response.data;
    return users;
  };

  const find = async (accountId) => {
    const response = await client.get(`/profiles/${accountId}`);
    return response.data;
  };

  const updateOps = async (accountId, operations) => {
    const response = await client.put(`/profiles/${accountId}`, {
      operations,
      _model_update: true,
    });
    return response.data;
  };

  return {
    list,
    find,
    updateOps,
  };

};
