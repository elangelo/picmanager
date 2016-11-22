import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as GalleryActions from './actions.js';

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

        console.log('gallery.render: ' + this.currentpath);
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

        console.log('<****************>');
        console.log(currentpath);
        var htmlpath = currentpath
            .split('/')
            .filter((item) => (item != ''))
            .map(function (item, index) {
                return (
                    <div id='index'>
                        <div>/</div>
                        <div>{item}</div>
                    </div>
                );
            });
        // if (a.length > 0) {
        //     a.forEach(function (element) {
        //         console.log('splitted this part: ' + element);
        //         htmlpath += <div>/</div> + <div></div>;
        //     });
        // }
        // else {
        //     htmlpath = <div>/</div>;
        // }

        console.log(htmlpath);
        console.log('</****************>');

        return (
            <div>
                <div id='path'>{htmlpath}</div>
                <div>
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