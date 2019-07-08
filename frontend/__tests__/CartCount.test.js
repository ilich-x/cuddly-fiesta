import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CartCount from '../components/CartCount';

describe('<Item/>', () => {
  it('renders', () => {
    shallow(<CartCount count={10} />);
  });

  it('matches snapshots', () => {
    const wrapper = shallow(<CartCount count={11} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('updates via props ', () => {
    const wrapper = shallow(<CartCount count={50} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ count: 10 });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
