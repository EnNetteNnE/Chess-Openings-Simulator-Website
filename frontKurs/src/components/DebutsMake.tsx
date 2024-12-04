import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { idText } from "typescript";
import { Mod } from "../models/Mod";
import { Modes } from "../models/Modes";
import { sendPostTree } from "../models/bek";
import { sendGetTree } from '../models/bek';

interface DebutProps {
    title: string;
    //debuts: { id: number; name: string }[];
    board: Board;
    restart: () => void;
    mod: Mod;
    token: string;
    debuts: { id: number; name: string }[];
    setDebuts: (debuts: { id: number; name: string }[]) => void;
    setRestartTrue: (restartTrue: boolean) => void;
}


const DebutsMake: FC<DebutProps> = ({title, board, restart, mod, token, debuts, setDebuts, setRestartTrue}) => {

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
        //board.Debuts.push(login)
        console.log(login)
        console.log(token)
        sendPostTree(login, token)
        setLogin("")
        setDebuts(sendGetTree(token));
        //setLoginDirty(false)
        restart()
      }

      const makes = (debut: { id: number; name: string }) => {
        mod.mod = Modes.MAKE
        mod.debut = debut
        //console.log({debut})
        setRestartTrue(true)
      }
      
    if (debuts.length >= 6) {
        return (
            <p className = "debuts">
                <h3>{title}</h3>
                {debuts.map(debut => 
                    <p key={debut.name}>
                        <button onClick={() => makes(debut)} className="butDeb">{debut.name}</button>
                    </p>
                )}
            </p>
        );
    }

    return (
        <p className = "debuts">
            <h3>{title}</h3>
            {debuts.map(debut => 
                <p key={debut.name}>
                    <button onClick={() => makes(debut)} className="butDeb">{debut.name}</button>
                </p>
            )}
            <input className="inpDeb" id="textInput" onChange={e => loginHandler(e)} value={login} onBlur={e => blurHeader(e)} name='debut' type="text" placeholder="Enter your debut..."/>
            <button id="b" onClick={() => entrance()} disabled={!formValid} type='submit' className="butDeb">+</button>
        </p>
    );


    
};

export default DebutsMake;



