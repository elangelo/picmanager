import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from '../actions';

//carousel?
//http://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_carousel2&stacked=h
//http://www.w3schools.com/bootstrap/bootstrap_carousel.asp
//https://github.com/xiaolin/react-image-gallery


export class ImageViewer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('in render method of imageviewer');
        const {children, currentpath, currentimage, selectImage, listDirectory} = this.props;
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

export default connect(mapStateToProps, mapActionCreatorsToProps)(ImageViewer);