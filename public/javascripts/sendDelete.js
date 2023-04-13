async function sendDelete(url, username, password) {
    console.log(url)
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        }
    }).then((response) => {
        if (response.ok) {
            const resData = 'User deleted...';
            location.reload()
            return Promise.resolve(resData);    
        }
        return Promise.reject(response); 
    })
      .catch((response) => {
        alert(response.statusText);
      });;
}