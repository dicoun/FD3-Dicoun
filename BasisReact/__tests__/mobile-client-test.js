import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';

test('работа MobileClient', () => {

  const component = renderer.create(
    <MobileClient />
  );

  let componentTree=component.toJSON();
  /*expect(componentTree).toMatchSnapshot();*/

  // найдём в вёрстке компонента саму кнопку
  const editBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'edit' ); 

  // и "нажмём" на неё
  editBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

  // найдём в вёрстке компонента саму кнопку
 /* const deleteBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'delete' ); 
  // и "нажмём" на неё
  deleteBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();*/
    
});
