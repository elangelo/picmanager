import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from './actions.js';

export class Gallery extends Component {
    constructor(props) {
        super(props);
        // this.props.dispatch({ type: 'TEST' });
        console.log(props);
    }
    // componentDidMount() {
    //     fetch('./api/files?path=')
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (blob) {
    //             this.setState({ blob });
    //         }).catch(function (err) {
    //             alert(err);
    //         });
    // }
    render() {
        const {children, currentpath, selectDirectory} = this.props;

        var htmlChildren = children.map(function (child, index) {
            if (child.IsDirectory) {
                return (
                    <div key={index} onClick={() => selectDirectory(child.name)}>
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

        return (
            <div>
                {htmlChildren}
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
        path: state.currentpath
    };
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(Gallery);