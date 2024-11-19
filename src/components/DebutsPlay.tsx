import React, { FC } from "react";
import { Mod } from "../models/Mod";
import { Modes } from "../models/Modes";

interface DebutProps {
    title: string;
    debuts: string[];
    restart: () => void;
    mod: Mod;
}


const DebutsPlay: FC<DebutProps> = ({title, debuts, restart, mod}) => {

    const makes = (debut: string) => {
        mod.mod = Modes.PLAYWHITE
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
        </p>
    );
};


export default DebutsPlay;


