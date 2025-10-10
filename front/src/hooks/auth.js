const authenticate = async (e, isLogin) => {
  const url = isLogin ?
    'http://localhost:3000/auth/login' :
    'http://localhost:3000/auth/register'

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(e),
    });

    if (!response.ok) {
      return {
        success: false,
        error: isLogin ?
          'Login failed' :
          'Register failed',
      };
    }

    const data = isLogin ? await response.json() : null;

    return { success: true, token: data.token, authUser: data.user };
  } catch (error) {
    return { success: false, error };
    // error: 'Network error or invalid response',
  }
}

export {
  authenticate,
}
