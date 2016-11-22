const defaultState = {
    children: [],
    currentPath: '/'
};


export default function children(state = defaultState, action) {
    switch (action.type) {
        case 'LIST_DIRECTORY':
            return {
                ...state,
                currentPath: action.child.path
            };
        case 'CD_DONE':
            return {
                ...state,
                children: action.children
            };
        default:
            return state;
    }
};