export const LIST_DIRECTORY = 'LIST_DIRECTORY';

export function listDirectory(directory) {
    console.log('action.listDirectory(' + directory + ')');
    return {
        type: LIST_DIRECTORY,
        directory
    };
}