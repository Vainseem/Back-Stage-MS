import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './mock'
import {Provider} from "react-redux";
import {store} from "./store";
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>

);


reportWebVitals();
