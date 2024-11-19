import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { idText } from "typescript";
import { Mod } from "../models/Mod";
import { Modes } from "../models/Modes";

interface DebutProps {
    title: string;
    debuts: string[];
    board: Board;
    restart: () => void;
    mod: Mod;
}


const DebutsMake: FC<DebutProps> = ({title, debuts, board, restart, mod}) => {

    const [login, setLogin] = useState('')
    const [loginDirty, setLoginDirty] = useState(false)
    const [loginError, setLoginError] = useState('Логин не может быть пустым')
    const [formValid, setFormValid] = useState(false)

  useEffect(() => {
    if (loginError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [loginError])

    const loginHandler = (e: any) => {
        setLogin(e.target.value)
        if(e.target.value.length < 3 || e.target.value.length > 20) {
          setLoginError('Название дебюта должно быть от 3 до 20 символов')
          if(!e.target.value) {
            setLoginError('Название дебюта не может быть пустым')
          }
        } else {
          setLoginError('')
        }
      }

      const blurHeader = (e: any) => {
            setLoginDirty(true)
      }

      const entrance = () => {
        //отправить название на бэк и потом рестарт
        board.Debuts.push(login)
        setLogin("")
        //setLoginDirty(false)
        restart()
      }

      const makes = (debut: string) => {
        mod.mod = Modes.MAKE
        //console.log({debut})
        restart()
      }
      


    return (
        <p className = "debuts">
            <h3>{title}</h3>
            {debuts.map(debut => 
                <p key={1}>
                    <button onClick={() => makes(debut)}>{debut}</button>
                </p>
            )}
            <input id="textInput" onChange={e => loginHandler(e)} value={login} onBlur={e => blurHeader(e)} name='debut' type="text" placeholder="Enter your debut..."/>
            <button id="b" onClick={() => entrance()} disabled={!formValid} type='submit'>+</button>
        </p>
    );


    
};

export default DebutsMake;



