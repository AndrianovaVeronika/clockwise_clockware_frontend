const initialState = {
    orders: {
        ordersList: [],
        newOrder: {
            name: '',
            login: '',
            clock_type: '',
            city: '',
            datetime: new Date(),
            master_id: 0,
        },
        ui:{

        }
    },
    // masters: {
    //     mastersList: [],
    // },
};

export default initialState;