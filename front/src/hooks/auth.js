
const authenticate = async (e, isLogin, setUserData) => {
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

    const data = await response.json();
    setUserData(data);

    // if (isLogin)
    //   localStorage.setItem('token', data.token);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: 'Network error or invalid response',
    };
  }
}

export {
  authenticate,
}
