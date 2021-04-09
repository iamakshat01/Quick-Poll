import config from '../config'

// creating a poll
const create = async (entity) => {
    try {
        
      const token=localStorage.getItem('jwtToken')  
      let response = await fetch(config.server+'/api/polls', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+JSON.parse(token)
          },
          body: JSON.stringify(entity)
        })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
}


// voting a poll
const vote = async (pollId,data) => {
  try {
      
    const token=localStorage.getItem('jwtToken')  
    let response = await fetch(config.server+'/api/polls/'+pollId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JSON.parse(token)
        },
        body: JSON.stringify(data)
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// all polls in db
const readall = async () => {
  try {

      const token=localStorage.getItem("jwtToken")  
      let response = await fetch(config.server+'/api/polls', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JSON.parse(token)
        }
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

//read polls of a user
const read = async () => {
  try {
      
    const token=localStorage.getItem("jwtToken")  
    let response = await fetch(config.server+'/api/polls/user', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JSON.parse(token)
        }
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

// specific poll with id
const readone = async (pollId) => {
  try {
      
    const token=localStorage.getItem("jwtToken")  
    let response = await fetch(config.server+'/api/polls/'+pollId, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JSON.parse(token)
        }
      })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

export {
    create,
    read,
    readall,
    readone,
    vote
}