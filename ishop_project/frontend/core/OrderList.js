import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { orderThunkAC } from "../redux/fetchOrder";

class OrderList extends React.PureComponent {

  static propTypes = {
    orders: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.dispatch( orderThunkAC(this.props.dispatch) );
  }

  render() {
    console.log(this.props.orders);

    var calculatedSum = 0;
    this.props.orders.data && this.props.orders.data.map(function(c, i) {
      calculatedSum += c.count*(parseFloat(c.price)); 
      
      });
    calculatedSum = calculatedSum.toFixed(2);

    if ( this.props.orders.status<=1 )
      return "загрузка...";

    if ( this.props.orders.status===2 )
      return "ошибка загрузки данных";

    return (
      <div>
        <table>
          <tbody>
          {
            this.props.orders.data && this.props.orders.data.map( (prodInfo,index) => {
              return <tr key={index}><td>{prodInfo['name']}</td><td>{prodInfo['count'] + 'шт.'}</td></tr>
            })
          }
          </tbody>
        </table>
        <span>Сумма заказа: {calculatedSum}</span>
      </div>
    );

  }

}

const mapStateToProps = function (state) {
  return {
    orders: state.orders,
  };
};

export default connect(mapStateToProps)(OrderList);
