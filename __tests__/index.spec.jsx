import React from 'react'
import { shallow } from 'enzyme'

import Home from '../pages'

describe('Content', () => {
  it('render correctly', () => {
    const app = shallow(<Home />)
    expect(app).toBeTruthy()
    app.update()
  })
})