import React from 'react';
import PropTypes from 'prop-types';

import './ViewCard.css';

class ViewCard extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.string,
        url: PropTypes.string,
        remainder: PropTypes.string,
        code: PropTypes.number,
    };

    render() {
        return (
            <div className='ViewCard'>
                <label> </label>
                <div className='ViewName'>{this.props.name}</div>
                <label> </label>
                <div><label>{'Price: '}</label><span className='ViewPrice'>{this.props.price}</span></div>
                <a className='ViewURL' href={this.props.url} target='_blank'>{'Фото'}</a>
                <div><label>{'Quantity: '}</label><span className='ViewRemainder'>{this.props.remainder}</span></div>
            </div>
        )
    };

}

export default ViewCard;