import React from 'react';
import { expect } from 'chai';
import { shallow,configure,mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Signup from '../components/auth/Signup';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducers from "../reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
configure({ adapter: new Adapter() });

describe('<Signup>', () => {
  const mockStore = configureStore([]);
  let wrapper;
  let istate={
    authenticated: '',
    errorMessage: ''
  };
  let store;
  beforeEach(() => {
    store = mockStore(istate);
    wrapper = mount(
      <Provider store={store}>
        <Signup />
      </Provider>
    );
});

  it('has a signup button', () => {
    expect(wrapper.containsMatchingElement(<button>Sign Up!</button>)).to.be.true;
  });

  it('has a email input field', () => {
    expect(wrapper.containsMatchingElement(<input type="text" />)).to.be.true;
  });

  it('has a password input field', () => {
    expect(wrapper.containsMatchingElement(<input type="password" />)).to.be.true;
  });

  it('passes login information', () => {
    /*const email = 'tjgarlick@gmail.com';
    const password = '123password';
    const wrapper = shallow(<Signin handleSubmit={state => {
      expect(state.email).to.be.equal(email);
      expect(state.password).to.be.equal(password);
    }}/>);*/
    wrapper.setState({ email: 'tjgarlick@gmail.com', password: '123password'});
    wrapper.find('button').simulate('click');
  });
});