export default (client) => {

  const logIn = async ({ username, password }) => {
    const authResponse = await client.post(
      '/developers/access',
      { username, password },
    );
    const accessToken = authResponse.data.token;
    return { accessToken };
  };

  return {
    logIn,
  };

};
