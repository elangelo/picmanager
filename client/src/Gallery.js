import React, {Component} from 'react'

 const dirContent = [
 {IsDirectory : true, Name:"2004", Path:"2004"},
 {IsDirectory : true, Name:"2005", Path:"2005"},
 {IsDirectory: false, Name:"IMG_65554.jpg", Path:"IMG_65554.jpg"}
 ]

export default class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: dirContent
        }
    }
    componentDidMount(){
        fetch('./api/files?path=')
        .then(function (response){
            response.json();
        })
        .then(function (blob) {
            alert(blob);
            this.setState({blob});
       });
    }
    render(){
        const {children} = this.state;

        var htmlChildren = children.map(function(child, index){
            if (child.IsDirectory){
                 return (
                     <div>
                        {child.Name}
                    </div>
                )
            }
            else {
                return (
                    <div>image</div>
                ) 
            }
        })

        return (
            <div>
                {htmlChildren}
            </div>
        )
    }
 }