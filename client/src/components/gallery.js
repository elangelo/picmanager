import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from '../actions';

import PathToolbar from './pathtoolbar';

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
                        <div key={index} onClick={() => listDirectory(child.Path)}>
                            {child.Name}
                        </div>
                    );
                }
                else {
                    return (
                        <div key={index}>image</div>
                    );
                }
            });
        }
        else {
            htmlChildren = <div>nothing found</div>;
        }

        return (
            <div>
                <PathToolbar listDirectory={listDirectory} path={currentpath} />
                <div style={{clear:'both'}}>
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