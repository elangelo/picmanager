import React from 'react';

const maincontainerStyle = {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    boxShadow: '2px 2px 5px rgba(0,0,0,0.25)',
    float: 'left',
    display: 'block',
    width: 200,
    height: 200,
    marginLeft: 1,
    marginRight: 12.5,
    marginTop: 16
};

const tagcontainerStyle = {
    backgroundColor: '#C6FCFF',
    color: 'rgb( 100, 100, 100)',
    fontSize: 'small',
    margin:  2,
    padding: 2,
    float: 'left'
};

export default function GalleryFolder({name, path, tags, listDirectory}) {

    if (tags) {
        var tagCloud = tags.map(function (item, index) {
            return (<div style={ tagcontainerStyle }>
                {item}
            </div>);
        });
    }

    return (
        <div style={maincontainerStyle} onClick={listDirectory.bind(this, path)}>
            <div style={{ margin: 'auto', width: '70%' }}>
                <svg style={{ width: 140, height: 140 }} preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                    <path d="M20 6h-8l-2-2h-6c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2zm0 12h-16v-10h16v10z"></path>
                </svg>
            </div>
            <div style={{ margin: 'auto', textAlign: 'center', fontWeight: 'normal' }}>
                {name}
            </div>
            <div style={{margin: 5, padding: 5}}>
                {tagCloud}
            </div>
        </div>
    );
}