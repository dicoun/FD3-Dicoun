import React from 'react';
import PropTypes from 'prop-types';

import './EditAddCard.css';

class EditAddCard extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.string,
        url: PropTypes.string,
        remainder: PropTypes.string,
        code: PropTypes.number,
        cbTextChanged: PropTypes.func,
        cbFieldClick: PropTypes.func,
        nameErrState: PropTypes.bool,
        priceErrState: PropTypes.bool,
        urlErrState: PropTypes.bool,
        quantityErrState: PropTypes.bool,
    };

    TextChanged = (EO, type) => {
        this.props.cbTextChanged(EO.target.value, type);
    }

    /*TextChanged(EO, type){
        this.props.cbTextChanged(EO.target.value, type);
    }*/

    FieldClick = (EO) => {
        this.props.cbFieldClick();
    }

    render() {
        return (
            <div className='EditAddCard'>
                <div><span>{'ID:'}</span><span>{this.props.code}</span></div>
                <div>
                    <label>{'Name:'}</label><span className='tabName'></span><input type='text' className='EditAddName'
                            defaultValue={this.props.name} onChange={(EO) => this.TextChanged(EO,'name')} onClick={(EO) => this.FieldClick()}
                        />{(this.props.nameErrState) && <span><span className='tab'></span><span className='err'>{'Please, fill the field. Value must be a string.'}</span></span>}
                </div>
                <div>
                    <label>{'Price:'}</label><span className='tabPrice'></span><input type='text' className='EditAddPrice'
                                defaultValue={this.props.price} onChange={(EO) => this.TextChanged(EO,'price')} onClick={(EO) => this.FieldClick()}
                            />{(this.props.priceErrState) && <span><span className='tab'></span><span className='err'>{'Please, fill the field. Value must match the pattern.'}</span></span>}
                </div>
                <div>
                    <label>{'URL:'}</label><span className='tabUrl'></span><input type='text' className='EditAddURL'
                                defaultValue={this.props.url} onChange={(EO) => this.TextChanged(EO,'url')} onClick={(EO) => this.FieldClick()}
                            />{(this.props.urlErrState) && <span><span className='tab'></span><span className='err'>{'Please, fill the field. Value must be a valid URL.'}</span></span>}
                </div>
                <div>
                    <label>{'Quantity:'}</label><span className='tabQuantity'></span><input type='text' className='EditAddRemainder'
                                defaultValue={this.props.remainder} onChange={(EO) => this.TextChanged(EO, 'remainder')} onClick={(EO) => this.FieldClick()}
                            />{(this.props.quantityErrState) && <span><span className='tab'></span><span className='err'>{'Please, fill the field. Value must match the pattern.'}</span></span>}
                </div>
            </div>
        )
    };

}

export default EditAddCard;