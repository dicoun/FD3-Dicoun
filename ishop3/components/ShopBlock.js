import React from 'react';
import PropTypes from 'prop-types';

import './ShopBlock.css';
import ProductRow from './ProductRow';
import ViewCard from './ViewCard';
import EditAddCard from './EditAddCard';

class ShopBlock extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    goods: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        remainder: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
      })
    ),
  };

  state = {
    selectedRowCode: null,
    selectedRowURL: null,
    selectedRowName: null,
    selectedRowPrice: null,
    selectedRowRemainder: null,
    edetedRowCode: null,
    edetedRowURL: null,
    edetedRowName: null,
    edetedRowPrice: null,
    edetdeRowRemainder: null,
    currEdetedRowURL:null,
    currEdetedRowName:null,
    currEdetedRowPrice:null,
    currEdetedRowRemainder:null,
    addRow:false,
    editRow:false,
    goodsArr: [],
    isDeleted: false,
    isSelected: false,
    nameWarning: false,
    priceWarning: false,
    urlWarning: false,
    quantityWarning: false
  };

  rowDelete = (code) => {
    this.setState({isDeleted:true});
    if(code){
      let goodsArr = [];
      if((this.state.goodsArr.length) || (!this.state.goodsArr.length && this.state.isDeleted)){
        goodsArr=this.state.goodsArr;
      }
      else{
        goodsArr=this.props.goods;
      }
      resultArr = goodsArr.filter(function(item, index, array) {
          if(item.code != code){
              return true;
          }
              return false;
          });
      }
      this.setState({goodsArr:resultArr});
  }

  rowBlockClick = (code, url, name, price, remainder) => {
    if(!this.state.addRow){
      if(code != this.state.edetedRowCode){
        if((this.state.edetedRowURL == this.state.currEdetedRowURL) 
          && (this.state.edetedRowName == this.state.currEdetedRowName) 
          && (this.state.edetedRowPrice == this.state.currEdetedRowPrice) 
          && (this.state.edetedRowRemainder == this.state.currEdetedRowRemainder)){
            this.setState( {
                            selectedRowCode:code,
                            selectedRowURL:url,
                            selectedRowName:name,
                            selectedRowPrice:price,
                            selectedRowRemainder:remainder,
                            edetedRowCode:null,
                            edetedRowURL:null,
                            edetedRowName:null,
                            edetedRowPrice:null,
                            edetedRowRemainder:null,
                            currEdetedRowURL:null,
                            currEdetedRowName:null,
                            currEdetedRowPrice:null,
                            currEdetedRowRemainder:null,
                            editRow: false,
                            addRow: false,
                            isSelected: true
                          } );
          }
        }
    }
  }

  rowEdit = (code, name, price, url, remainder) => {
    if(code != this.state.edetedRowCode){
      if((this.state.edetedRowURL == this.state.currEdetedRowURL) 
        && (this.state.edetedRowName == this.state.currEdetedRowName) 
        && (this.state.edetedRowPrice == this.state.currEdetedRowPrice) 
        && (this.state.edetedRowRemainder == this.state.currEdetedRowRemainder)){
        this.setState( {
          selectedRowCode:code,
          edetedRowCode:code,
          edetedRowURL:url,
          edetedRowName:name,
          edetedRowPrice:price,
          edetedRowRemainder:remainder,
          currEdetedRowURL:url,
          currEdetedRowName:name,
          currEdetedRowPrice:price,
          currEdetedRowRemainder:remainder,
          addRow: false,
          editRow:true,
          isSelected: false
        } );
      }
    }
  }

  rowAdd = () => {
    this.setState( {
                    addRow:true,
                    selectedRowCode: null,
                    editRow: false
                  } );
  }

  formTextChanged = (value, type) => {
    switch(type){
      case 'url': 
        this.setState({currEdetedRowURL:value});
        break;
      case 'name':
        this.setState({currEdetedRowName:value});
        break;
      case 'price':
        this.setState({currEdetedRowPrice:value});
        break;
      case 'remainder':
        this.setState({currEdetedRowRemainder:value});
        break;
    }
  }

  FormFieldClicked = () => {
    var nameRegex = /[^А-Яа-яЁёA-Za-z0-9]/g;
    var priceRegex = /[0-9][,][0-9]{2}[\s]р.$/g;
    var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/g;
    var quantityRegex = /[0-9][\s]шт.$/g;
    if(nameRegex.test(this.state.currEdetedRowName)){
      this.setState({nameWarning:false});
    }
    else{
      this.setState({nameWarning:true});
    }
    if(priceRegex.test(this.state.currEdetedRowPrice)){
      this.setState({priceWarning:false});
    }
    else{
      this.setState({priceWarning:true});
    }
    if(urlRegex.test(this.state.currEdetedRowURL)){
      this.setState({urlWarning:false});
    }
    else{
      this.setState({urlWarning:true});
    }
    if(quantityRegex.test(this.state.currEdetedRowRemainder)){
      this.setState({quantityWarning:false});
    }
    else{
      this.setState({quantityWarning:true});
    }
  }

  AddBtn = () => {
    var goodsArr = [];
    if((this.state.goodsArr.length) || (!this.state.goodsArr.length && this.state.isDeleted)){
      goodsArr=this.state.goodsArr;
    }
    else{
      goodsArr=this.props.goods;
    }
    var newCode=goodsArr.length+1;
    goodsArr.push({
                    code:newCode, 
                    name:this.state.currEdetedRowName, 
                    price:this.state.currEdetedRowPrice, 
                    url:this.state.currEdetedRowURL, 
                    remainder:this.state.currEdetedRowRemainder
                  });
    this.setState({
                    goodsArr:goodsArr, 
                    addRow:false,
                    currEdetedRowURL:null,
                    currEdetedRowName:null,
                    currEdetedRowPrice:null,
                    currEdetedRowRemainder:null,
                    edetedRowCode:null,
                    edetedRowURL:null,
                    edetedRowName:null,
                    edetedRowPrice:null,
                    edetedRowRemainder:null,
                    nameWarning: false,
                    priceWarning: false,
                    urlWarning: false,
                    quantityWarning: false
                  });
  }

  EditBtn= () => {
    var goodsArr = [];
    if((this.state.goodsArr.length) || (!this.state.goodsArr.length && this.state.isDeleted)){
      goodsArr=this.state.goodsArr;
    }
    else{
      goodsArr=this.props.goods;
    }
    var me = this;
    var updatedGoodsArr = goodsArr.map(function(item) {
      if(item.code == me.state.edetedRowCode){
          item.url=me.state.currEdetedRowURL ? me.state.currEdetedRowURL : me.state.edetedRowURL;
          item.name=me.state.currEdetedRowName ? me.state.currEdetedRowName : me.state.edetedRowName;
          item.price=me.state.currEdetedRowPrice ? me.state.currEdetedRowPrice : me.state.edetedRowPrice;
          item.remainder=me.state.currEdetedRowRemainder ? me.state.currEdetedRowRemainder : me.state.edetedRowRemainder;
          return item;
      }
      return item;
    });

    this.setState( {
      editRow:false,
      goodsArr:updatedGoodsArr,
      currEdetedRowURL:null,
      currEdetedRowName:null,
      currEdetedRowPrice:null,
      currEdetedRowRemainder:null,
      edetedRowCode:null,
      edetedRowURL:null,
      edetedRowName:null,
      edetedRowPrice:null,
      edetedRowRemainder:null,
      nameWarning: false,
      priceWarning: false,
      urlWarning: false,
      quantityWarning: false
    } );
  }

  CnlEditBtn = () => {
    this.setState( {
                    edetedRowCode:null,
                    edetedRowURL:null,
                    edetedRowName:null,
                    edetedRowPrice:null,
                    edetedRowRemainder:null,
                    currEdetedRowURL:null,
                    currEdetedRowName:null,
                    currEdetedRowPrice:null,
                    currEdetedRowRemainder:null,
                    editRow:false,
                    nameWarning: false,
                    priceWarning: false,
                    urlWarning: false,
                    quantityWarning: false
                  } );
  }

  CnlAddBtn = () => {
    this.setState( {
                    currEdetedRowURL:null,
                    currEdetedRowName:null,
                    currEdetedRowPrice:null,
                    currEdetedRowRemainder:null,
                    addRow: false,
                    nameWarning: false,
                    priceWarning: false,
                    urlWarning: false,
                    quantityWarning: false
                   } );
  }

  render() {
    var goodsArr = [];
    if((this.state.goodsArr.length) || (!this.state.goodsArr.length && this.state.isDeleted)){
      goodsArr=this.state.goodsArr;
    }
    else{
      goodsArr=this.props.goods;
    }
    let tableCode=goodsArr.map( v =>
      <ProductRow key={v.code}
        code={v.code} url={v.url} name={v.name}
        price={v.price} remainder={v.remainder}
        cbRowDelete={this.rowDelete}
        cbRowClick={this.rowBlockClick}
        selectedRowCode={this.state.selectedRowCode}
        cbRowEdit={this.rowEdit}
        editRowState={this.state.editRow}
        addRowState={this.state.addRow}
      />
    );
    return (
      <div>
        <div className='ProductsTable'>
          <table className='Goods'>
            <caption className='ShopName'>{this.props.name}</caption>
            <tbody>
              <tr>
                <th>{'Name'}</th>
                <th>{'Price'}</th>
                <th>{'URL'}</th>
                <th>{'Quantity'}</th>
                <th>{'Control'}</th>
              </tr>
              {tableCode}
            </tbody>
          </table>
        </div>
        {(this.state.editRow || this.state.addRow) ? <input type='button' value='New product' disabled onClick={this.rowAdd}/> : <input type='button' value='New product' onClick={this.rowAdd}/>}
        {(this.state.isSelected) &&
          <ViewCard
            code={this.state.selectedRowCode} url={this.state.selectedRowURL} name={this.state.selectedRowName}
            price={this.state.selectedRowPrice} remainder={this.state.selectedRowRemainder}
          /> 
        }
        {
          (this.state.editRow) &&
          <div>
            <label>  </label>
            <div className='Title'>{'Edit existing Product'}</div>
            <label>  </label>
            <EditAddCard
              code={this.state.edetedRowCode} url={this.state.edetedRowURL} name={this.state.edetedRowName}
              price={this.state.edetedRowPrice} remainder={this.state.edetedRowRemainder} cbTextChanged={this.formTextChanged}
              cbFieldClick={this.FormFieldClicked} nameErrState={this.state.nameWarning} priceErrState={this.state.priceWarning}
              urlErrState={this.state.urlWarning} quantityErrState={this.state.quantityWarning} key={this.state.edetedRowCode}
            />
            <label>  </label>
            {(this.state.nameWarning || this.state.priceWarning || this.state.urlWarning || this.state.quantityWarning) ? <div><input type='button' value='Save' disabled onClick={this.EditBtn}/><input type='button' value='Cancel' onClick={this.CnlEditBtn}/></div> 
            : <div><input type='button' value='Save' onClick={this.EditBtn}/><input type='button' value='Cancel' onClick={this.CnlEditBtn}/></div>}
          </div>
        }
        {
          (this.state.addRow) &&
          <div>
             <label>  </label>
            <div className='Title'>{'Add new Product'}</div>
            <label>  </label>
            <EditAddCard
              cbTextChanged={this.formTextChanged}  
              cbFieldClick={this.FormFieldClicked}
              nameErrState={this.state.nameWarning} priceErrState={this.state.priceWarning}
              urlErrState={this.state.urlWarning} quantityErrState={this.state.quantityWarning}
            />
            <label>  </label>
            {(this.state.nameWarning || this.state.priceWarning || this.state.urlWarning || this.state.quantityWarning) ? <div><input type='button' value='Add' disabled onClick={this.AddBtn}/><input type='button' value='Cancel' onClick={this.CnlAddBtn}/></div> 
            : <div><input type='button' value='Add' onClick={this.AddBtn}/><input type='button' value='Cancel' onClick={this.CnlAddBtn}/></div>}
            
          </div>
        }
      </div>
    );

  }

}

export default ShopBlock;