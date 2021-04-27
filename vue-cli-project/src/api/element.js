import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import {
    Form,
    FormItem,
    Input,
    RadioGroup,
    Radio,
    Button,
    Option,
    Select,
    Message,
    Menu,
    MenuItem,
    Table,
    TableColumn
} from 'element-ui';
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Button);
Vue.use(Option);
Vue.use(Select);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.prototype.$message = Message;

