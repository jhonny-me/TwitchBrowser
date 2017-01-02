/**
 * Created by johnny on 29/12/2016.
 */
import React, {PropTypes} from 'react'
require('../css/ItemView.css')

const placeholderImg = 'http://placehold.it/50x50'
export default class ItemView extends React.Component {

    static propTypes = {
        logo: PropTypes.string,
        name: PropTypes.string,
        status: PropTypes.string,
        detail: PropTypes.string,
        nameUrl: PropTypes.string,
        detailUrl: PropTypes.string,
    };

    static defaultProps = {
        logo: null,
        name: 'placeholder',
        status: 'offline',
        detail: null,
        nameUrl: null,
        detailUrl: null,
    };

    render() {

        let detailLabel = null;
        let {logo} = this.props;
        let bkColor = "white";
        if (this.props.detail) {
            detailLabel = <a href={this.props.detailUrl} className="detail">{this.props.detail}</a>;
            bkColor = 'green';
        }else {
            detailLabel = <i className="detail">{this.props.status}</i>;
            bkColor = 'gray';
        }
        if (!logo) {
            logo = placeholderImg;
        }
        console.log(logo)
        console.log(bkColor, this.props)
        return (
            <div style={{backgroundColor: bkColor}} className="ItemView">
                <img src={logo} className="logo" ></img>
                <a href={this.props.nameUrl} target="_blank" className="name">{this.props.name}</a>
                {detailLabel}
            </div>
        );
    }
}