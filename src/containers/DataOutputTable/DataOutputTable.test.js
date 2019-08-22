import React from 'react';
import { DataOutputTable, mapStateToProps } from './';
import { shallow } from 'enzyme';
jest.mock('uuid', () => jest.fn(() => 1));

describe('DataOutputTable', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<DataOutputTable selectedModal={'Laboratory Data'} />)
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

});

describe('mapStateToProps function', () => {
  it('should return an object with the selected output modal', () => {
    const mockState = {
      selectedModal: 'Vitals',
      somethingElse: 'Booyah!'
    }
    const expected = {
      selectedModal: 'Vitals'
    }
    const mappedProps = mapStateToProps(mockState)

    expect(mappedProps).toEqual(expected)
  });

});