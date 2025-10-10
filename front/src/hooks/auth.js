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
    })

    if (!response.ok) {
      return {
        success: false,
        error: isLogin ?
          'login_fail_toast' :
          'register_fail_toast',
      }
    }

    const data = isLogin ? await response.json() : null
    return isLogin ?
      { success: true, token: data.token, authUser: data.user } :
      { success: true }

  } catch (error) {
    return {
      success: false,
      error: 'invalid_response'
    }
  }
}

export {
  authenticate,
}
