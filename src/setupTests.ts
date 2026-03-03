import '@testing-library/jest-dom';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-18';

configure({ adapter: new Adapter() });
