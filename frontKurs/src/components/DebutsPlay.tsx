import React, { FC } from "react";
import { Mod } from "../models/Mod";
import { Modes } from "../models/Modes";

interface DebutProps {
    debut: { id: number; name: string };
    restart: () => void;
    mod: Mod;
    setRestartTrue: (restartTrue: boolean) => void;
}


const DebutsPlay: FC<DebutProps> = ({debut, restart, mod, setRestartTrue}) => {

    const makes = (debut: { id: number; name: string }) => {
        mod.mod = Modes.PLAY;
        mod.debut = debut;
        //console.log({debut})
        setRestartTrue(true)
      }

      const playWhite = () => {
        mod.mod = Modes.PLAYWHITE;
        setRestartTrue(true)
      }

      const playBlack = () => {
        mod.mod = Modes.PLAYBLACK;
        setRestartTrue(true)
      }

      if((mod.mod === Modes.PLAY) && (mod.debut === debut)) {
        return (
            <p>
                <button onClick={() => makes(debut)} className="butDeb">{debut.name}</button>
                <p></p>
                <button onClick={() => playWhite()} className="buttonwhite"></button>
                <button onClick={() => playBlack()} className="buttonblack"></button>
            </p>
        );
      }

    return (
        <p>
            <button onClick={() => makes(debut)} className="butDeb">{debut.name}</button>
        </p>
    );
};


export default DebutsPlay;


