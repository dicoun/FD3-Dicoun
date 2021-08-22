import React from 'react';
import PropTypes from 'prop-types';

import './ProductBlock.css';

class ProductBlock extends React.Component {

    static propTypes = {
        prodInfo: PropTypes.object.isRequired,
        cbAddToBasket: PropTypes.func.isRequired
    };
    
    addToBasket = (e) => {
        this.props.cbAddToBasket(this.props.prodInfo);
    };

    render() {
        return (
            <div className='prodBlock'>
                <div className="image"><img src={this.props.prodInfo['src']} title={this.props.prodInfo['title']} alt={this.props.prodInfo['title']} /></div>
                <div className="name">{this.props.prodInfo['name']}</div>
                <div className="stock">{this.props.prodInfo['stock']}</div>
                <div className="price">{this.props.prodInfo['price']}</div>
                <div className="cart">
                    <input type="button" kind="add" value="В эко-сумку" onClick={this.addToBasket} className="button" />   
                </div>
            </div>
        )
    };

}

export default ProductBlock;