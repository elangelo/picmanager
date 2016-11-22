export const LIST_DIRECTORY = 'LIST_DIRECTORY';
//const LOAD_CHILDREN = 'LOAD_CHILDREN';

export function listDirectory(directory) {
    console.log('action.listDirectory(' + directory + ')');
    return {
        type: LIST_DIRECTORY,
        directory
    };
}

// export function loadChildren() {
//     return {
//         type: LOAD_CHILDREN
//     };
// }