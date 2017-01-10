import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from '../actions';

import PathToolbar from './pathtoolbar';
import GalleryFolder from './galleryfolder';
import GalleryImage from './galleryimage';
import ImageViewer from './imageviewer';

export class Gallery extends Component {
    constructor(props) {
        super(props);
        console.log('constructor gallery');
    }
    componentDidMount() {
        this.props.listDirectory('/');
    }
    render() {
        console.log('in render method of gallery');
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

        var navigationHeight = windowheight - 40;
        var imagePreview;
        var thumbs;
        var overflowX = 'none';
        var overflowY = 'auto';
        if (currentimage) {
            navigationHeight = 275;
            var previewheight = windowheight - navigationHeight;
            overflowX = 'auto';
            overflowY = 'none';
            var imgsrc = '/api/image?path=' + currentimage + '&size=800';
            imagePreview = <div style={{display:'block'}}>
                            <div style={{display:'inline-block', color:'white'}}>&lt;</div>
                             <div style={{ height: previewheight, display:'inline-block' }}>
                               <img style={{ height: previewheight - 10, margin: 'auto' }} src={imgsrc} />
                             </div>
                             <div style={{display:'inline-block', color:'white'}}>&gt;</div>
                           </div>;
            thumbs =  <div style={{ clear: 'both', backgroundColor: '#555', height: navigationHeight, whiteSpace: 'nowrap', overflowX:overflowX, overflowY:overflowY }}>{htmlChildren}</div>;
        }
        else {
            imagePreview = <div style={{ display: 'none' }}></div>;
            thumbs =  <div style={{ clear: 'both', backgroundColor: '#555', height: navigationHeight, overflowX:overflowX, overflowY:overflowY}}>{htmlChildren}</div>;
        }

        return (
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 1)', flex: 1 }}>
                <PathToolbar listDirectory={listDirectory} path={currentpath} />
                {imagePreview}
                {thumbs}
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