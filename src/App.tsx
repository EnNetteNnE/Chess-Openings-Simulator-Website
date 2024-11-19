import React, { useEffect, useState } from 'react';
import "./App.css";
import axios from 'axios';
import { useMutation } from 'react-query';
import BoardComponent from './components/BoardComponent';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';
import DebutsMake from './components/DebutsMake';
import DebutsPlay from './components/DebutsPlay';
import { Modes } from './models/Modes';
import { Mod } from './models/Mod';

const API_URL = 'http://localhost:8080'



const App = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginDirty, setLoginDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [loginError, setLoginError] = useState('Логин не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (loginError || passwordError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [loginError, passwordError])

  const loginHandler = (e: any) => {
    setLogin(e.target.value)
    if(e.target.value.length < 3 || e.target.value.length > 20) {
      setLoginError('Логин должен быть от 3 до 20 символов')
      if(!e.target.value) {
        setLoginError('Логин не может быть пустым')
      }
    } else {
      setLoginError('')
    }
  }

  const passwordHandler = (e: any) => {
    setPassword(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 8) {
      setPasswordError('Пароль должен быть от 3 до 8 символов')
      if(!e.target.value) {
        setPasswordError('Пароль не может быть пустым')
      }
    } else {
      setPasswordError('')
    }
  }
  
  const blurHeader = (e: any) => {
    switch (e.target.name) {
      case 'login':
        setLoginDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  const [user, setUser] = useState(false)



  const registrations = () => {
    // тут если
    const HashPassword: string = password;

    setUser(true)
  }

  const entrance = () => {
    const HashPassword: string = password;
    //
    setUser(true)
  }






  const [mod, setMod] = useState(new Mod(Modes.NULL)) //состояние в котором сейчас игра

  const [board, setBoard] = useState(new Board())   //[состояние, функция, которая будет изменять состояние] = хук, которым инициализируем состояние
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const[currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  

  useEffect(() => { // чтобы метод вызывался при старте
    restart()
    setCurrentPlayer(whitePlayer);
    //clickUp(mod);
  }, [DebutsMake])

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  function restart() { // начинаем новую партию игры
    const newBoard = new Board(); 
    newBoard.initCells() //метод инициализации ячеек
    newBoard.addFigures() // раставить фигуры
    //newBoard.addDebuts()
    setBoard(newBoard) // сохраняем новый объект в состоянии
  }






  return (
    <div className="game">
      {!user ? (
        
        <form className='form'>
        <h1>Регистрация</h1>

        {(loginDirty && loginError) && <div style={{color:'red'}}>{loginError}</div>}
        <input onChange={e => loginHandler(e)} value={login} onBlur={e => blurHeader(e)} name='login' type="text" placeholder="Enter eour login..."/>
        
        {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
        <input onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHeader(e)} name='password' type="password" placeholder="Enter eour password..."/>
        
        <button onClick={() => registrations()} disabled={!formValid} type='submit'>Регистрация</button>

        <button onClick={() => entrance()} disabled={!formValid} type='submit'>Вход</button>
      </form>

      ) : (
        <div className="app">

      <BoardComponent //сюда пропсы нада передать
        //swapPlayer={swapPlayer}
        board={board} 
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        mod={mod}
      />

      <p>
        <DebutsMake
          title="Создавать"
          debuts={board.Debuts}
          board={board}
          restart={restart}
          mod={mod}
        />
        <p>
         
        </p>
        <DebutsPlay
          title="Играть"
          debuts={board.Debuts}   
          restart={restart}
          mod={mod}       
        />
      </p>

    </div>

      )}

      

    </div>
  );
};

export default App;