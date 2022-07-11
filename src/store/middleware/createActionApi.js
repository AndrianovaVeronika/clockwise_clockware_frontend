import instance from "./instance";

export default (modelName) => {
    return {
        GET: async (_, thunkAPI) => {
            try {
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
                const response = await instance.post('/' + modelName, newInstance, {
                    headers: {
                        'x-access-token': sessionStorage.getItem('TOKEN')
                    }
                });

                return response.data;
            } catch (e) {
                console.log('error in post ' + modelName    )
                return thunkAPI.rejectWithValue(e.response.data)
            }
        },
        PUT: async ({id, ...updateValues}, thunkAPI) => {
            try {
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