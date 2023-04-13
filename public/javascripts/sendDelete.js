async function sendDelete(url, username, password) {
    console.log(url)
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Basic ${btoa(username + ':' + password)}`,
        }
    });
    const resData = 'resource deleted...';
    location.reload()
    return resData;
}