import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, deleteExpense } from './redux/expenseSlice';
import './App.css';

function App() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const { expenses, income, expense } = useSelector((state) => state.expense);


  const handleAddExpense = () => {
    if (!amount) {
      setErrorMessage('請輸入金額');
      return;
    }
    if (!description) {
      setErrorMessage('請輸入項目');
      return;
    }

    setErrorMessage(''); 

    dispatch(addExpense({ id: Date.now(), amount: parseFloat(amount), description, type }));
    setAmount('');
    setDescription('');
  };


  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  
  const selectStyle = {
    backgroundColor: type === 'income' ? '#4caf50' : '#f44336', 
    color: 'white',
    padding: '8px 16px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  };


  const formatCurrency = (amount) => {
    return `${amount} 元`;
  };

  return (
    <div className="App">
      <h1>記帳小工具</h1>


      <div>
        <input
          type="number"
          placeholder="金额"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="項目"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        

        <select 
          onChange={(e) => setType(e.target.value)} 
          value={type} 
          style={selectStyle}
        >
          <option value="expense">支出</option>
          <option value="income">收入</option>
        </select>


        <button onClick={handleAddExpense}>添加</button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}


      <h2>總收入：{formatCurrency(income)}</h2>
      <h2>總支出：{formatCurrency(expense)}</h2>
      <h2>餘額：{formatCurrency(income - expense)}</h2>

   
      <h2>收支紀錄</h2>
      <ul>
        {expenses.map((expenseItem) => (
          <li key={expenseItem.id} style={{ 
            backgroundColor: expenseItem.type === 'income' ? '#e8f5e9' : '#ffebee', 
            padding: '10px',
            margin: '5px 0',
            borderRadius: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {expenseItem.description}: {formatCurrency(expenseItem.amount)} ({expenseItem.type})

            <button 
              style={{
                color: '#fff',
                background: '#f44336',
                padding: '5px 10px',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
              onClick={() => handleDelete(expenseItem.id)}
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
