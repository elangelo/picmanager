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


        var pathparts = currentpath
            .split('/')
            .filter((item) => (item != ''));
        var grmblpath = new Array();
        for (var i = 0; i < pathparts.length; i++) {
            var grr = pathparts[i];
            if (i > 0) {
                grr = grmblpath[i - 1] + grr;
            }
            grmblpath[i] = grr;
        }

        var htmlpath = grmblpath.map(function (item, index) {
            return (
                <div id={index} style={{display: 'block', border: '1px solid red'}}>
                    <div style={{float: 'left'}}>></div>
                    <div style={{float: 'left'}} onClick={() => listDirectory(item)}>
                        {item}
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div id='path'>{htmlpath}</div>
                <div style={{display: 'block'}}>
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