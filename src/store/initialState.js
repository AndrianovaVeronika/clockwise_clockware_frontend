const initialState = {
    auth: {
        currentUser: {},
        orderUser: {},
        isAuth: false,
        userLoading: true,
        isAdmin: false
    },
    users: {
        usersList: [],
    },
    orders: {
        ordersList: [],
    },
    masters: {
        mastersList: [],
        availableMasters: []
    },
    cities: {
        citiesList: [],
    },
    clockTypes: {
        clockTypesList: [],
    }
};

export default initialState;