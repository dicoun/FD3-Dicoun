var FilterBlock = React.createClass({

    displayName: 'FilterBlock',
  
    propTypes: {
      values:React.PropTypes.arrayOf(
        React.PropTypes.shape({
          code: React.PropTypes.number.isRequired,
          text: React.PropTypes.string.isRequired
        })
      )
    },
  
    getInitialState: function() {
      return { 
        isSort: false,
        resetText: ''
      };
    },

    sortClicked: function(EO) {
        //console.log('FilterAnswer: чекбокс нажат - '+EO.target.value); 
        this.setState({isSort: !this.state.isSort});
    },

    textChanged:  function(EO) { 
        //console.log('FilterAnswer: текст изменён - '+EO.target.value); 
        this.setState({resetText: EO.target.value});
    },

    resetClicked: function(EO) { 
        //console.log('FilterAnswer: кнопка сброса нажата - '+EO.target.value); 
        this.setState({isSort: false, resetText: ''});
    },
  
    render: function() {
        if(this.state.isSort){
            var sortArr = this.props.values.sort(function (a, b) { 
                if (a.text < b.text) return -1
                return a.text > b.text ? 1 : 0
            })
            if(this.state.resetText){
                var resText = this.state.resetText;
                var filterArray = this.props.values.filter(function (el) {
                    return el.text.includes(resText);
                });
            }
            else{
                var filterArray = sortArr;
            }
            var listCode = filterArray.map( v =>
                React.DOM.div({className:'Text', key:v.code}, 
                    React.DOM.span({className:'textSpan'},v.text)
                )
            );
        }
        else{
            var sortArr = this.props.values.sort(function (a, b) { 
                if (a.code < b.code) return -1
                return a.code > b.code ? 1 : 0
            });
            if(this.state.resetText){
                var resText = this.state.resetText;
                var filterArray = this.props.values.filter(function (el) {
                    return el.text.includes(resText);
                  });
            }
            else{
                var filterArray = sortArr;
            }
            var listCode = filterArray.map( v =>
                React.DOM.div({className:'Text', key:v.code}, 
                    React.DOM.span({className:'textSpan'},v.text)
                )
            );
        }

        return React.DOM.div( {className:'FilterBlock'},
            React.DOM.input({type:'checkbox', name:'isSort', checked: this.state.isSort, onClick:this.sortClicked}),
            React.DOM.input({type:'text', value:this.state.resetText, name:'text', onChange:this.textChanged}),
            React.DOM.input({type:'button',value:'сброс',onClick:this.resetClicked}),
            React.DOM.br(),
            React.DOM.div({className: 'List'}, listCode)
        );
  
    },
  
  });