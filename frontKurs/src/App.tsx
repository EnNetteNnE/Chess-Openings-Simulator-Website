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
import { createHash } from 'crypto';
import { sendPostUser, sendPostUserToken, sendGetTree, sendGetMoveTree, sendDeleteUserToken, hashPassword } from './models/bek';

const API_URL = 'http://localhost:8080'



const App = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [loginDirty, setLoginDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [loginError, setLoginError] = useState('Логин не может быть пустым')
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')
  const [formValid, setFormValid] = useState(false)

  const [userDirty, setUserDirty] = useState(false)
  const [userError, setUserError] = useState('Пользователь с таким именем уже есть')
  const [autDirty, setAutDirty] = useState(false)
  const [autError, setAutError] = useState('Неверный логин или пароль')
  const [trueUserDirty, setTrueUserDirty] = useState(false)
  const [trueUserError, setTrueUserError] = useState('Пользователь успешно зарегистрирован')
  const [restartTrue, setRestartTrue] = useState(false)

  const [token, setToken] = useState('0')
  const [debuts, setDebuts] = useState<{ id: number; name: string }[]>([])

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
/*
  async function registrations(): Promise<void> {
    const HashPassword: string = password;

    try {
        const id = await sendLoginRequest(login, HashPassword);
        
        // Проверка, является ли id единицей
        if (id === 0) {
          setUser(false);
        } else {
          setUser(true)
        }
    } catch (error) {
        console.error('Error during login or ID check:', error);
    }
}

*/
const registrations = () => { // кнопочка регистрации
    // тут если
    const HashPassword: string = hashPassword(password);
  
    const id = sendPostUser(login, HashPassword);
  

    console.log('yyyyyy', id);

    if (id === 0) {
      setUserDirty(true);
      setTrueUserDirty(false);
      setAutDirty(false);
    } else {
      setTrueUserDirty(true);
      setUserDirty(false);
      setAutDirty(false);
    }

    //setUser(true)
  }

  const entrance = () => { //кнопочка входа
    const HashPassword: string = hashPassword(password);

    const token = sendPostUserToken(login, HashPassword);

    if (token === '0') {
      setAutDirty(true);
      setTrueUserDirty(false);
      setUserDirty(false);
    } else {
      setToken(token);
      console.log(token);
      setUser(true);
      setDebuts(sendGetTree(token));
    }

    //setUser(true)
  }

  const exit = () => {
    setMod(new Mod(Modes.NULL, {id: 0, name: '0'}))
    setUser(false)
    sendDeleteUserToken(token)
    //сюда команду делит для токена
  }






  const [mod, setMod] = useState(new Mod(Modes.NULL, {id: 0, name: '0'})) //состояние в котором сейчас игра
  let boards: Board[] = [];
  let boards1: string[] = [];

  const [board, setBoard] = useState(new Board())   //[состояние, функция, которая будет изменять состояние] = хук, которым инициализируем состояние
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  

  useEffect(() => { // чтобы метод вызывался при старте
    restart()
    
    //clickUp(mod);
  })

  function swapPlayer() {
    setCurrentPlayer((currentPlayer?.color === Colors.WHITE) ? blackPlayer : whitePlayer)
    console.log("swaaaaaaaaaaaaaaaaaaaaaaaaaaaaap", currentPlayer)
  }

  function restart() { // начинаем новую партию игры
    console.log("restsrt")

    if(restartTrue) {
      setRestartTrue(false)
      const newBoard = new Board(); 
    //console.log(mod.mod)
      //console.log(mod.mod)
      newBoard.initCells() //метод инициализации ячеек
      newBoard.addFigures() // раставить фигуры
      setCurrentPlayer(whitePlayer);
      
      //newBoard.BoardsStr.id = sendGetMoveTree(mod.debut?.id);
      //console.log(newBoard.id);
      //newBoard.Debuts = sendGetTree(token);
    //newBoard.currentPlayer = Colors.WHITE
    //newBoard.addDebuts()
    
    
      let boardSTR: string = "";
      boardSTR = newBoard.boardToString();
      if(currentPlayer?.color === Colors.WHITE) {boardSTR += "w"}
      else {boardSTR += "b"}
    //console.log({boardSTR})
      newBoard.BoardsStr.push({str: boardSTR, id: sendGetMoveTree(mod.debut?.id)})
      newBoard.NextM(); // обязательно раскоментить, когда будет нормальный фен
      setBoard(newBoard) // сохраняем новый объект в состоянии
    }
  }




  

  return (
    <div className="game">
      {!user ? (
        
        <div className='form'>

        {(loginDirty && loginError) && <div style={{color:'red'}}>{loginError}</div>}
        <input className='input' onChange={e => loginHandler(e)} value={login} onBlur={e => blurHeader(e)} name='login' type="text" placeholder="Введите логин..."/>
        
        {(passwordDirty && passwordError) && <div style={{color:'red'}}>{passwordError}</div>}
        <input className='input' onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHeader(e)} name='password' type="password" placeholder="Введите пароль..."/>
        <p></p>
        <button className='bt' onClick={() => registrations()} disabled={!formValid} type='submit'>Регистрация</button>
        
        <button className='bt' onClick={() => entrance()} disabled={!formValid} type='submit'>Вход</button>

        {(userDirty && userError) && <div style={{color:'red'}}>{userError}</div>}
        {(autDirty && autError) && <div style={{color:'red'}}>{autError}</div>}
        {(trueUserDirty && trueUserError) && <div style={{color:'green'}}>{trueUserError}</div>}
      </div>

      ) : (
        <div className="app">

      <BoardComponent //сюда пропсы нада передать
        // swapPlayer={swapPlayer}
        board={board} 
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
        mod={mod}
        boards={boards1}
        token={token}
        setRestartTrue={setRestartTrue}
        restart={restart}
        setCurrentPlayer={setCurrentPlayer}
      />

      <p>
            <p className = "debuts">
                <h3>{"Играть"}</h3>
                {debuts.map(debut => 
                //{(mod.debut === debut) ? () : ()}
                <DebutsPlay
                debut={debut}   
                restart={restart}
                mod={mod}   
                setRestartTrue={setRestartTrue}    
              />
                )}
            </p>

        <DebutsMake
          title="Создавать"
          board={board}
          restart={restart}
          mod={mod}
          token = {token}
          debuts={debuts}
          setDebuts={setDebuts}
          setRestartTrue={setRestartTrue}
        />
        <button className='vixod' onClick={() => exit()} type='submit'>Выход</button>
      </p>
                
    </div>

      )}

      

    </div>
  );
};

export default App;