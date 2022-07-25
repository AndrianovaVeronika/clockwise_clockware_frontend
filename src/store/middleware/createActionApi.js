import instance from "./instance";

const createActionApi = (modelName) => {
    return {
        GET: async (_, thunkAPI) => {
            try {
                console.log('GET ' + modelName)
                const response = await instance.get('/' + modelName, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('TOKEN')
                    }
                });
                return response.data || {};
            } catch (e) {
                return thunkAPI.rejectWithValue(e.response.data)
            }
        },
        GET_BY_ID: async (id, thunkAPI) => {
            console.log('GET BY ID ' + modelName + '' +  id)
            try {
                const response = await instance.get('/' + modelName + '/' + id, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('TOKEN')
                    }
                });
                return response.data || {};
            } catch (e) {
                return thunkAPI.rejectWithValue(e.response.data)
            }
        },
        POST: async (newInstance, thunkAPI) => {
            try {
                console.log('POST ' + modelName)
                const response = await instance.post('/' + modelName, newInstance, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('TOKEN')
                    }
                });
                return response.data;
            } catch (e) {
                return thunkAPI.rejectWithValue(e.response.data)
            }
        },
        PUT: async ({id, ...updateValues}, thunkAPI) => {
            try {
                console.log('UPDATE ' + modelName)
                const response = await instance.put('/' + modelName + '/' + id, updateValues, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('TOKEN')
                    }
                });
                return response.data;
            } catch (e) {
                return thunkAPI.rejectWithValue(e.response.data)
            }
        },
        DELETE: async (instanceId, thunkAPI) => {
            try {
                console.log('DELETE ' + modelName)
                const response = await instance.delete('/' + modelName + '/' + instanceId, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('TOKEN')
                    }
                });
                return response.data;
            } catch (e) {
                return thunkAPI.rejectWithValue(e.response.data)
            }
        }
    }
}

export default createActionApi;