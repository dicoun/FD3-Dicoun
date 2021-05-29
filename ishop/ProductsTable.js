var ProductsTable = React.createClass({

    displayName: 'ProductsTable',
  
    render: function() {
  
      var tableCode=[]; 
        this.props.goods.forEach(function(product){
            var tableCodeObj= 
            React.DOM.tr({key:product.code,className:'Row'},
                React.DOM.td({key:'ProdName '+ product.code},
                    React.DOM.span({className:'ProdName'},product.name),
                ),
                React.DOM.td({key:'ProdPrice '+ product.code},
                    React.DOM.span({className:'ProdPrice'},product.price),
                ),
                React.DOM.td({key:'ProdUrl '+ product.code},
                    React.DOM.a({className:'ProdUrl', href:product.url}, 'Фото'),
                ),
                React.DOM.td({key:'ProdRemainder'+ product.code},
                    React.DOM.span({className:'ProdRemainder'},product.remainder),
                ),
            );
            tableCode.push(tableCodeObj);     
        });
      var tBody = React.DOM.tbody({key:'ProdTable'}, 
        React.DOM.tr({key:'caption'},
            React.DOM.th({}, 'Наименование товара'),
            React.DOM.th({}, 'Цена товара'),
            React.DOM.th({}, 'Фото товара'),
            React.DOM.th({}, 'Товара в наличии'),
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