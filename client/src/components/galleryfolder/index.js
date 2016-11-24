import React from 'react';
import buildStyles from './buildStyles';

export default function GalleryFolder({name, path, listDirectory}) {
    return (
        <div onClick={listDirectory.bind(this, path)}>
            {name}
        </div>
    );
}