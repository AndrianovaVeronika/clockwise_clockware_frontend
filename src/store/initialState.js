const initialState = {
    auth: {
        currentUser: {},
        isAuth: false,
        userLoading: true,
        isAdmin: false
    },
    users: {
        usersList: [],
    },
    orders: {
        ordersList: [],
        orderUser: {},
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