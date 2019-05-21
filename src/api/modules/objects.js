export default (client) => {

  const list = async (objectTypeSlug, params) => {
    const response = await client.get(
      `/objects/${objectTypeSlug}/list`,
      { params },
    );
    const { objects } = response.data;
    return objects;
  };

  const find = async (objectTypeSlug, objectId, params) => {
    const response = await client.get(
      `/objects/${objectTypeSlug}/${objectId}`,
      { params },
    );
    return response.data;
  };

  return {
    list,
    find,
  };

};
