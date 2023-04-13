async function sendDelete(url) {
    console.log(url)
    const response = await fetch(url, {
        method: 'DELETE',
    }).then((response) => {
        if (response.ok) {
            const resData = 'User deleted...';
            return Promise.resolve(resData);    
        }
        return Promise.reject(response); 
    })
      .catch((response) => {
        alert(response.statusText);
      });;
}