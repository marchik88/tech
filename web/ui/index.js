// Custom Components
import UIFlex from './Flex';
import UIButton from './Button';
import UICard from './Card';
import UICheckbox from './Checkbox';
import UIDrawer from './Drawer';
import UIAvatar from './Avatar';
import UIInput from './Input';
import UIText from './Text';
import UISpin from './Spin';
import UIImage from './Image';
import UIUpload from './Upload';
import UITabs from './Tabs';
import UITooltip from './Tooltip';
import UILayout from './Layout';
import UIMenu from './Menu';
import UIMessage from './Message';
import UITable from './Table';
import UIUploader from './Uploader';
import UICarousel from './Carousel';
import UIMentions from './Mentions';
import UIModal from './Modal';
import ThemeToggler from './ThemeToggler';
import LanguageToggler from './LanguageToggler';

// UI Library Components
import Form from 'antd/lib/form';
import Notification from 'antd/lib/notification';
// UI Library Components to Customize
import Message from 'antd/lib/message';
import Antd_Select from 'antd/lib/select';
import Antd_Upload from 'antd/lib/upload';
import Antd_Button from 'antd/lib/button';
import Antd_Card from 'antd/lib/card';
import Antd_Checkbox from 'antd/lib/checkbox';
import Antd_Drawer from 'antd/lib/drawer';
import Antd_Avatar from 'antd/lib/avatar';
import Antd_Input from 'antd/lib/input';
import Antd_Tabs from 'antd/lib/tabs';
import Antd_Tooltip from 'antd/lib/tooltip';
import Antd_Modal from 'antd/lib/modal';
import Antd_Layout from 'antd/lib/layout';
import Antd_Menu from 'antd/lib/menu';
import Antd_Table from 'antd/lib/table';
import Antd_Carousel from 'antd/lib/carousel';
import Antd_Spin from 'antd/lib/spin';
import Antd_Mentions from 'antd/lib/mentions';
import Antd_DatePicker from 'antd/lib/date-picker';
import Antd_AutoComplete from 'antd/lib/auto-complete';

// extract additional components
const { Password, TextArea } = Antd_Input;
const { TabPane } = Antd_Tabs;
const { Option } = Antd_Select;
const { Sider } = Antd_Layout;
const { SubMenu, Item, ItemGroup } = Antd_Menu;
const { Meta } = Antd_Card;
const { RangePicker } = Antd_DatePicker;

export const Text = UIText(p => <span {...p} />);
export const Image = UIImage(p => <img {...p} />);
export const Button = UIButton(Antd_Button);
// export const Card = UICard(Antd_Card);
export const Tooltip = UITooltip(Antd_Tooltip);
export const Table = UITable(Antd_Table);
export const Carousel = UICarousel(Antd_Carousel);
export const Checkbox = UICheckbox(Antd_Checkbox);
export const Drawer = UIDrawer(Antd_Drawer);
export const Avatar = UIAvatar(Antd_Avatar);
export const Spin = UISpin(Antd_Spin);
export const Modal = UIModal(Antd_Modal);
// export const Message = UIMessage(Antd_Message);
export const Upload = UIUpload(Antd_Upload);
export const Tabs = UITabs(Antd_Tabs)(TabPane);
export const Layout = UILayout(Antd_Layout, Sider);
export const Mentions = UIMentions(Antd_Mentions, Option);
//
export const Input = UIInput(p =>
  p.type === 'password' ? (
    <Password {...p} />
  ) : p.type === 'largetext' ? (
    <TextArea {...p} />
  ) : (
    <Antd_Input {...p} />
  )
);
export const Menu = UIMenu(p =>
  p.type === 'submenu' ? (
    <SubMenu {...p} />
  ) : p.type === 'group' ? (
    <ItemGroup {...p} />
  ) : p.type === 'item' ? (
    <Item {...p} />
  ) : (
    <Antd_Menu {...p} />
  )
);
export const Card = UICard(p =>
  p.type === 'meta' ? <Meta {...p} /> : <Antd_Card {...p} />
);

// Configurate datepicker
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

export {
  Form,
  DatePicker,
  ThemeToggler,
  LanguageToggler,
  ru as ruLocale,
  UIFlex as Flex,
  UIUploader as Uploader,
  Notification,
  Antd_Select as Select,
  Message,
  Antd_AutoComplete as AutoComplete,
};
