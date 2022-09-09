const baseHeaders = {
    headers: {
        'x-access-token': sessionStorage.getItem('TOKEN')
    }
};

export default baseHeaders;