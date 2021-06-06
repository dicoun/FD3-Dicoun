var ProductRow = React.createClass({

    displayName: 'ProductRow',
  
    propTypes: {
      name: React.PropTypes.string.isRequired,
      price: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      remainder: React.PropTypes.string.isRequired,
      code: React.PropTypes.string.isRequired,
      cbRowDelete: React.PropTypes.func.isRequired,
      cbRowClick: React.PropTypes.func.isRequired,
      selectedRowCode: React.PropTypes.string,
    },
  
    delete: function(EO) {
        var result = confirm('Вы действительно хотите удалить товар?');
        if(result){
            this.props.cbRowDelete(this.props.code);   
        }
        EO.stopPropagation();
    },

    rowClick: function(e){
        this.props.cbRowClick(this.props.code);
    },
  
    render: function() {
  
        return React.DOM.tr({ className: (this.props.selectedRowCode == this.props.code) ? 'Row selectedRow' : 'Row', onClick:this.rowClick},
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