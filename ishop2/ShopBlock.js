var ShopBlock = React.createClass({

    displayName: 'ShopBlock',

    propTypes: {
        name: React.PropTypes.string.isRequired,
        goods:React.PropTypes.arrayOf(
          React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            price: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            remainder: React.PropTypes.string.isRequired,
            code: React.PropTypes.string.isRequired,
          })
        ),
        cbMainRowDelete:React.PropTypes.func.isRequired,
      },

    getInitialState: function() {
      return { 
        selectedRowCode: null,
      };
    },

    rowDelete: function(code) { 
        this.props.cbMainRowDelete(code, this.props.goods);
    },

    rowBlockClick: function(code) {
      this.setState( {selectedRowCode:code} );
    },
  
    render: function() {
      var me = this;
      var tableCode=[]; 
        this.props.goods.forEach(function(product){
            var tableCodeObj= 
            React.createElement(ProductRow, {key:product.code,
                code:product.code,  url:product.url, 
                name:product.name, price:product.price,
                remainder:product.remainder,
                cbRowDelete:me.rowDelete,
                cbRowClick: me.rowBlockClick,
                selectedRowCode: me.state.selectedRowCode,
              })
            tableCode.push(tableCodeObj);     
        });
      var tBody = React.DOM.tbody({key:'ProdTable'}, 
        React.DOM.tr({key:'caption'},
            React.DOM.th({}, 'Name'),
            React.DOM.th({}, 'Price'),
            React.DOM.th({}, 'URL'),
            React.DOM.th({}, 'Quantity'),
            React.DOM.th({}, 'Control'),
        ),
        tableCode);

      return React.DOM.div( {className:'ProductsTable'}, 
        React.DOM.table( {className:'Goods'},
            React.DOM.caption({className:'ShopName'}, this.props.name), 
            tBody 
        ),
      );
    },
  });