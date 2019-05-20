export default (client) => {

  const getAccessToken = async ({ authToken }) => {
    const accessResponse = await client.post(
      '/access',
      { auth_token: authToken },
    );
    const accessToken = accessResponse.data.token;
    return accessToken;
  };

  const register = async ({ email, username, password }) => {
    const registerResponse = await client.post(
      '/accounts',
      { email, username, password },
    );
    const authToken = registerResponse.data.token;
    const accessToken = await getAccessToken({ authToken });
    return { authToken, accessToken };
  };

  const logIn = async ({ username, password }) => {
    const authResponse = await client.post(
      '/auth',
      { user: { username, password } },
    );
    const authToken = authResponse.data.token;
    const accessToken = await getAccessToken({ authToken });
    return { authToken, accessToken };
  };

  return {
    register,
    logIn,
    getAccessToken,
  };

};
