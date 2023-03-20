


export const getProgramInfo = (program) => {
    const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }
      //FORMAT QUERY STRING
      let str = ''
      for (let i=0; i < program.length; i++) {
        if (i===0) {
          str = str + `program[]=${program[i]}`
        } else {
          str = str + `&program[]=${program[i]}`
        }
      }

      return new Promise((resolve, reject) => {
        fetch(`/course/getRequiredCourses?${str}`, request)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
      })
}

export const getCourses = (user) => {
    const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }

      return new Promise((resolve, reject) => {
        fetch(`/course/getCourses?id=${user}`, request)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
      })
}

export const getUserButtons = (user) => {
    const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }
      return new Promise((resolve, reject) => {
        fetch(`/button/getUserButtons?id=${user}`, request)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
      })
}