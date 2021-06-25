import React from 'react';
import PropTypes from 'prop-types';

import './ProductRow.css';

class ProductRow extends React.Component {

    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.string,
        url: PropTypes.string,
        remainder: PropTypes.string,
        code: PropTypes.number,
        cbRowDelete: PropTypes.func.isRequired,
        cbRowClick: PropTypes.func.isRequired,
        cbRowEdit: PropTypes.func.isRequired,
        selectedRowCode: PropTypes.number,
        editRowState: PropTypes.bool,
        addRowState: PropTypes.bool
    };

    delete = (EO) => {
        let result = confirm('Вы действительно хотите удалить товар?');
        if(result){
            this.props.cbRowDelete(this.props.code);   
        }
        EO.stopPropagation();
    };

    edit = (EO) => {
        this.props.cbRowEdit(this.props.code, this.props.name, this.props.price, this.props.url, this.props.remainder);
        EO.stopPropagation();
    }

    rowClick = (e) => {
        this.props.cbRowClick(this.props.code, this.props.url, this.props.name, this.props.price, this.props.remainder);
    };

    render() {
        return (
            <tr className={(this.props.selectedRowCode == this.props.code) ? 'Row selectedRow' : 'Row'} onClick={this.rowClick}>
                <td>
                    <span className='ProdName'>{this.props.name}</span>
                </td>
                <td>
                    <span className='ProdPrice'>{this.props.price}</span>
                </td>
                <td>
                   <a className='ProdUrl' href={this.props.url} target='_blank'>{'Фото'}</a>
                </td>
                <td>
                    <span className='ProdRemainder'>{this.props.remainder}</span>
                </td>
                <td>
                    {(this.props.addRowState) ? <input type='button' value='Edit' disabled onClick={this.edit}/> : <input type='button' value='Edit' onClick={this.edit}/>}
                    {(this.props.editRowState || this.props.addRowState) ? <input type='button' value='Delete' disabled onClick={this.delete}/> : <input type='button' value='Delete' onClick={this.delete}/>}
                </td>
            </tr>
                
        )
    };

}

export default ProductRow;