const initialState = {
    status: '',
    error: '',
    newsList: [],
    page: 1,
};

const newsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_TEXT':
            return { ...state, text: action.payload.data }

        default:
            return state;
    }

}

export default newsReducer;