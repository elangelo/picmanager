export const LIST_DIRECTORY = 'LIST_DIRECTORY';
export const SELECT_IMAGE = 'SELECT_IMAGE';

export function listDirectory(directory) {
    console.log('action.listDirectory(' + directory + ')');
    return {
        type: LIST_DIRECTORY,
        directory
    };
}   

export function selectImage(image){
    console.log('action.selectionImage(' + image + ')');
    return {
        type: SELECT_IMAGE,
        image
    };
}