import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ItemComponent from '../components/Item';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 4000,
  description: 'This item is really cool!',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item/>', () => {
  it('renders and matches snapshots', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('renders the image', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const img = wrapper.find('img');
    expect(img.props().src).toBe(fakeItem.image);
    expect(img.props().alt).toBe(fakeItem.title);
  });

  it('renders the pricetag and title', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const PriceTag = wrapper.find('PriceTag');
    expect(PriceTag.children().text()).toBe('$40');
    expect(wrapper.find('Title a').text()).toBe(fakeItem.title);
  });

  it('renders the btns', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    const btnList = wrapper.find('.buttonList');
    expect(btnList.children()).toHaveLength(3);
    expect(btnList.find('Link')).toHaveLength(1);
    expect(btnList.find('AddToCart')).toBeTruthy();
    expect(btnList.find('DeleteItem').exists()).toBe(true);
  });
});
