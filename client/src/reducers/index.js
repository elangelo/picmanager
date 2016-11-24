const defaultState = {
    children: [],
    currentpath: '/',
    currentimage: null
};

export default function children(state = defaultState, action) {
    switch (action.type) {
        case 'LIST_DIRECTORY':
            return {
                ...state,
                currentimage: null,
                currentpath: action.directory
            };
        case 'LIST_DIRECTORY_DONE':
            console.log('reducer, received CD_DONE ' + action);
            return {
                ...state,
                currentimage: null,
                children: action.children
            };
        case 'SELECT_IMAGE':
            console.log('reducer, received SELECT_IMAGE ' + action.image);
            return {
                ...state,
                currentimage: action.image
            };
        default:
            return state;
    }
};