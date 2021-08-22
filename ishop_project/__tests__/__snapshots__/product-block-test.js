import React from 'react';
import renderer from 'react-test-renderer';

import ProductBlock from '../core/ProductBlock';

test('работа ProductBlock', () => {

  const component = renderer.create(
    <ProductBlock />
  );

  let componentTree=component.toJSON();
  /*expect(componentTree).toMatchSnapshot();*/

  // найдём в вёрстке компонента саму кнопку
  const addBtnElem = component.root.find( el => el.type=='input' && el.props.kind == 'add' ); 
  // и "нажмём" на неё
  addBtnElem.props.onClick();

  // получаем уже изменённый снэпшот
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
 
   // получаем уже изменённый снэпшот
   componentTree=component.toJSON();
   expect(componentTree).toMatchSnapshot();
    
});
