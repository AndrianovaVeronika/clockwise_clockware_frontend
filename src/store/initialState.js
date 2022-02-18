const initialState = {
    auth: {
        currentUser: {},
        isAuth: false,
        userLoading: true
    },
    users: {
        usersList: [],
        rolesList: []
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