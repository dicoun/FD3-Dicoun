import React from 'react';
import renderer from 'react-test-renderer';

import MobileClient from '../components/MobileClient';
import MobileClientBtn from '../components/MobileClientBtn.js';

test('работа MobileClient', () => {

  const component = renderer.create(
    <MobileClient />
  );

  let componentTree=component.toJSON();
  /*expect(componentTree).toMatchSnapshot();*/

  //expect(component.root).toBeNull();

  // найдём в вёрстке компонента саму кнопку
  const editBtnElem = component.root.find( el => el.type=='input' /*&& el.props.dataKind == 'edit'*/ ); 
  //const editBtnElem = component.root.findByType(MobileClientBtn);

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
