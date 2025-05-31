// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 注意这里导入的是 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// 创建 root 实例
const root = ReactDOM.createRoot(document.getElementById('root')); 

// 使用 createRoot 渲染应用
root.render(
  <Provider store={store}>  {/* 确保 Provider 包裹整个应用 */}
    <App />
  </Provider>
);
