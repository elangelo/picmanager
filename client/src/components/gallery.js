import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from '../actions';

import PathToolbar from './pathtoolbar';
import GalleryFolder from './galleryfolder';
import GalleryImage from './galleryimage';

export class Gallery extends Component {
    constructor(props) {
        super(props);
        console.log('constructor gallery');
    }
    componentDidMount() {
        this.props.listDirectory('/');
    }
    render() {
        const {children, currentpath, currentimage, selectImage, listDirectory} = this.props;
        var htmlChildren;
        if (children) {
            htmlChildren = children.map(function (child, index) {
                if (child.IsDirectory) {
                    return (
                        <GalleryFolder name={child.Name} path={child.Path} tags={child.Tags} listDirectory={listDirectory} />
                    );
                }
                else {
                    return (
                        <GalleryImage name={child.Name} path={child.Path} selectImage={selectImage} />
                    );
                }
            });
        }
        else {
            htmlChildren = <div>nothing found</div>;
        }

        var windowheight = window.innerHeight;

        var navigationHeight = windowheight - 40 + 'px';
        var imagePreview;
        var overflowX = 'none';
        var overflowY = 'auto';
        if (currentimage) {
            navigationHeight = '100px';
            overflowX = 'auto';
            overflowY = 'none';
            var imgsrc = '/api/image?path=' + currentimage + '&size=800';
            imagePreview = <div style={{ flex: 1 }}><img style={{flex: 1}} src={imgsrc} /></div>;
        }
        else {
            imagePreview = <div  style={{ height: '0px' }}></div>;
        }

        return (
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 1)', flex: 1 }}>
                <PathToolbar listDirectory={listDirectory} path={currentpath} />
                {imagePreview}
                <div style={{ clear: 'both', backgroundColor: '#555', height: navigationHeight, overflowY: overflowY, overflowX: overflowX }}>
                    {htmlChildren}
                </div>
            </div>
        );

    }
}

function mapActionCreatorsToProps(dispatch) {
    return bindActionCreators(GalleryActions, dispatch);
}

function mapStateToProps(state) {
    return {
        children: state.children,
        currentpath: state.currentpath,
        currentimage: state.currentimage
    };
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery);