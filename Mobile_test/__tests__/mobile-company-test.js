import React from 'react';
import renderer from 'react-test-renderer';

import MobileCompany from '../components/MobileCompany';

test('работа MobileCompany', () => {

  const component = renderer.create(
    <MobileCompany />
  );

  let componentTree=component.toJSON();
  /*expect(componentTree).toMatchSnapshot();*/

  // найдём в вёрстке компонента саму кнопку
  const addBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'addClient' ); 
  // и "нажмём" на неё
  addBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
  const allBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'All' ); 
  // и "нажмём" на неё
  allBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
  const activeBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'Active' ); 
  // и "нажмём" на неё
  activeBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

   // найдём в вёрстке компонента саму кнопку
   const blockedBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'Blocked' ); 
   // и "нажмём" на неё
   blockedBtnElem.props.onClick();
 
   // получаем уже изменённый снэпшот
   componentTree=component.toJSON();
   expect(componentTree).toMatchSnapshot();
    
});
