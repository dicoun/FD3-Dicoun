var ProductRow = React.createClass({

    displayName: 'ProductRow',
  
    propTypes: {
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      remainder: React.PropTypes.string.isRequired,
      code: React.PropTypes.string.isRequired,
      cbRowDelete: React.PropTypes.func.isRequired,
    },
  
    delete: function(EO) {
        var result = confirm('Вы действительно хотите удалить товар?');
        if(result){
            this.props.cbRowDelete(this.props.code);   
        }
        EO.stopPropagation();
    },

    rowClick: function(e){
        function getParentTag(node,tag) {
            if (node) {return (node.tagName == tag) ? node : getParentTag(node.parentElement,tag);}
            return null;
          }
        var table = getParentTag(e.target,'TABLE');
        for (var row of table.rows) {
            row.classList.remove('selectedRow');
        }
        var selectedRow = getParentTag(e.target,'TR');
        selectedRow.classList.add('selectedRow');
    },
  
    render: function() {
  
        return React.DOM.tr({className:'Row', onClick:this.rowClick},
            React.DOM.td({key:'ProdName '+ this.props.code},
                React.DOM.span({className:'ProdName'},this.props.name),
            ),
            React.DOM.td({key:'ProdPrice '+ this.props.code},
                React.DOM.span({className:'ProdPrice'},this.props.price),
            ),
            React.DOM.td({key:'ProdUrl '+ this.props.code},
                React.DOM.a({className:'ProdUrl', href:this.props.url, target:'_blank'}, 'Фото'),
            ),
            React.DOM.td({key:'ProdRemainder'+ this.props.code},
                React.DOM.span({className:'ProdRemainder'},this.props.remainder),
            ),
            React.DOM.td({key:'delBtn'+ this.props.code},
                React.DOM.input({type:'button',value:'Delete',onClick:this.delete})
            ),
        )
  
    },
  
  });