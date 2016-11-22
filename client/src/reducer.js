const defaultState = {
    children: [],
    currentpath: '/'
};


export default function children(state = defaultState, action) {
    switch (action.type) {
        case 'LIST_DIRECTORY':
            return {
                ...state,
                currentpath: action.directory
            };
        case 'CD_DONE':
            console.log('reducer, received CD_DONE' + action);
            return {
                ...state,
                children: action.children
            };
        default:
            return state;
    }
};