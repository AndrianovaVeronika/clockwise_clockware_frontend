const initialState = {
    auth: {
        currentUser: {},
        isAuth: false,
        userLoading: true,
        isAdmin: false,
    },
    users: {
        usersList: [],
        usersFilteredList: [],
    },
    orders: {
        ordersList: [],
        ordersFilteredList: [],
        currentUserOrders: [],
        currentMasterOrders: []
    },
    masters: {
        mastersList: [],
        mastersFilteredList: [],
        availableMasters: [],
    },
    cities: {
        citiesList: [],
        citiesFilteredList: [],
        filteredCitiesList: []
    },
    clockTypes: {
        clockTypesList: [],
        clockTypesFilteredList: [],
    },
};

export default initialState;