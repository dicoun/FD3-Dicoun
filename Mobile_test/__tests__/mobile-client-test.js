import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';
import MobileClientBtn from '../components/MobileClientBtn.js';

test('работа MobileClient', () => {

  const client =  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:'200', state: "active", disabledFlag: true};

  const component = renderer.create(
    <MobileClient key={client.id} client={client}/>
  );

  let componentTree=component.toJSON();

  // найдём в вёрстке компонента саму кнопку
  const editBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'edit' ); 

  // и "нажмём" на неё
  editBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
  const deleteBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'delete' ); 
  // и "нажмём" на неё
  deleteBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
