const getBaseHeaders = () => ({
    'x-access-token': sessionStorage.getItem('TOKEN')
});

export default getBaseHeaders;