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
        const {children, currentpath, listDirectory} = this.props;
        var htmlChildren;
        if (children) {
            htmlChildren = children.map(function (child, index) {
                if (child.IsDirectory) {
                    return (
                        <GalleryFolder name={child.Name} path={child.Path} tags={child.Tags} listDirectory={listDirectory}/>
                    );
                }
                else {
                    return (
                        <GalleryImage name={child.Name} path={child.Path} /> 
                    );
                }
            });
        }
        else {
            htmlChildren = <div>nothing found</div>;
        }

        return (
            <div style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}>
                <PathToolbar listDirectory={listDirectory} path={currentpath} />
                <div style={{clear:'both', backgroundColor: '#555'}}>
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
        currentpath: state.currentpath
    };
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery);