var ProductsTable = React.createClass({

    displayName: 'ProductsTable',
  
    render: function() {
  
      var tableCode=[];
      for ( var a=0; a<this.props.goods.length; a++ ) {
        var product=this.props.goods[a];
        var tableCode=        
          React.DOM.div({key:product.code,className:'Row'},
            React.DOM.span({className:'ProdName'},product.name),
            React.DOM.span({className:'ProdPrice'},product.price),
            React.DOM.span({className:'ProdUrl'},product.url),
            React.DOM.span({className:'ProdRemainder'},product.remainder),
          );
          tableCode.push(tableCode);
      }
      return React.DOM.div( {className:'ProductsTable'}, 
        React.DOM.div( {className:'ShopName'}, this.props.name ),
        React.DOM.div( {className:'Goods'}, tableCode ),
      );
    },
  
  });