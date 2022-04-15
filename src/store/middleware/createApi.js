import instance from "./instance";

export default (modelName) => {
    return {
        GET: async (_, thunkAPI) => {
            try {
                const response = await instance.get('/' + modelName);
                return response.data || {};
            } catch (e) {
                console.log('!!!!Query screwed up with error!!!!');
                console.log('!!!!Error: ', e);
                return thunkAPI.rejectWithValue(e);
            }
        },
        POST: async (newInstance, thunkAPI) => {
            try {
                const response = await instance.post('/' + modelName, newInstance);
                return response.data;
            } catch (e) {
                console.log('!!!!Query screwed up with error!!!!');
                console.log('!!!!Error: ', e);
                return thunkAPI.rejectWithValue(e);
            }
        },
        PUT: async ({instanceId, ...updateValue}, thunkAPI) => {
            try {
                const response = await instance.put('/' + modelName + '/' + instanceId, updateValue);
                return response.data;
            } catch (e) {
                console.log('!!!!Query screwed up with error!!!!');
                console.log('!!!!Error: ', e);
                return thunkAPI.rejectWithValue(e);
            }
        },
        DELETE: async (instanceId, thunkAPI) => {
            try {
                const response = await instance.delete('/' + modelName + '/' + instanceId);
                return response.data;
            } catch (e) {
                console.log('!!!!Query screwed up with error!!!!');
                console.log('!!!!Error: ', e);
                return thunkAPI.rejectWithValue(e);
            }
        }
    }
}