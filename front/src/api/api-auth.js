import config from '../config'

// registering a user
const create = async (user) => {
    try {
        let response = await fetch(config.server+'/api/auth/register', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}

// signin a user
const signin = async (user) => {
  try {
    let response = await fetch(config.server+'/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
    create,
    signin
}