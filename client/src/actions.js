export const CD = 'CD';

export function selectDirectory(directory) {
    return {
        type: CD,
        directory
    };
}