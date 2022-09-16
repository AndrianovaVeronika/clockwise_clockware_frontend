const baseHeaders = {
    'x-access-token': sessionStorage.getItem('TOKEN')
};

export default baseHeaders;