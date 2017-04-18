import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from '../actions';

import PathToolbar from './pathtoolbar';
import GalleryFolder from './galleryfolder';
import PhotoGallery from 'react-photo-gallery';

// import GalleryImage from './galleryimage';
// import ImageViewer from './imageviewer';

export class MyGallery extends Component {
    constructor(props) {
        super(props);
        console.log('constructor gallery');
    }
    componentDidMount() {
        this.props.listDirectory('/');
    }
    render() {
        // console.log('in render method of gallery');
        const { children, currentpath, currentimage, selectImage, listDirectory, photos, folders } = this.props;
        var htmlChildren;
        var PHOTO_SET;
        if (children) {
            let photos = [];
            let folders = [];

            children.forEach(function (child, i, array) {
                if (children.IsDirectory) {
                    folders.push(<GalleryFolder name={child.Name} path={child.Path} tags={child.Tags} listDirectory={listDirectory} />);
                }
                else {
                    photos.push(
                        {
                            src: '/api/image?path=' + child.Path,
                            srcset: [
                                '/api/image?path=' + child.Path + '&size=1024 1024w',
                                '/api/image?path=' + child.Path + '&size=800 800w',
                                '/api/image?path=' + child.Path + '&size=500 500w',
                                '/api/image?path=' + child.Path + '&size=320 320w',
                            ],
                            sizes: [
                                '(min-width: 480px) 50vw',
                                '(min-width: 1024px) 33.3vw',
                                '100vw'
                            ],
                            width: parseInt(child.Metadata.Width),
                            height: parseInt(child.Metadata.Height ),
                            alt: child.Name,
                            caption: child.Name
                        }
                    );
                }
            });
            photos: this.props.photos ? this.props.photos.concat(photos) : photos;

            // htmlChildren = children.map(function (child, index) {
            //     if (child.IsDirectory) {
            //         return (
            //             <GalleryFolder name={child.Name} path={child.Path} tags={child.Tags} listDirectory={listDirectory} />
            //         );
            //     }
            // });
            // PHOTO_SET = children.map(function (child, index) {
            //     if (!child.IsDirectory) {
            //         var t = ({
            //             src: '/api/image?path=' + child.Path,
            //             srcset: [
            //                 '/api/image?path=' + child.Path + '&size=1024 1024w',
            //                 '/api/image?path=' + child.Path + '&size=800 800w',
            //                 '/api/image?path=' + child.Path + '&size=500 500w',
            //                 '/api/image?path=' + child.Path + '&size=320 320w',
            //             ],
            //             sizes: [
            //                 '(min-width: 480px) 50vw',
            //                 '(min-width: 1024px) 33.3vw',
            //                 '100vw'
            //             ],
            //             width: 681,
            //             height: 1024,
            //             alt: 'child.Name'
            //         });
            //         return t;
            //     }
            // });
            // else {
            //     return (
            //         <GalleryImage name={child.Name} path={child.Path} selectImage={selectImage} />
            //     );
            // }

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

        /*if (currentimage) {
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
        }*/

        // var images = <div style={{ clear: 'both', backgroundColor: '#555', height: navigationHeight / 2, overflowX: overflowX, overflowY: overflowY }}><PhotoGallery photos={PHOTO_SET} onClickPhoto={this.openLightbox} /></div>;
        var images = <PhotoGallery photos={PHOTO_SET} onClickPhoto={this.openLightbox} />;

        thumbs = <div style={{ clear: 'both', backgroundColor: '#555', height: navigationHeight / 2, overflowX: overflowX, overflowY: overflowY }}>{htmlChildren}</div>;

        return (
            <PhotoGallery photos={PHOTO_SET} onClickPhoto={this.openLightbox} />
        );
        /*<div style={{ backgroundColor: 'rgba(0, 0, 0, 1)', flex: 1 }}>
            <PathToolbar listDirectory={listDirectory} path={currentpath} />
            {images}
            {thumbs}
        </div>
    );*/

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

export default connect(mapStateToProps, mapActionCreatorsToProps)(MyGallery);