const defaultState = {
    children: [],
    currentPath: '/'
};


export default function children(state = defaultState, action) {
    switch (action.type) {
        case 'CD':
            console.log('this is just a test');
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