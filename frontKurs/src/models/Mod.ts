import { Modes } from "./Modes";


export class Mod {
    mod: Modes;
    debut: { id: number; name: string };

    constructor(mod: Modes, debut: { id: number; name: string }) {
        this.mod = mod;
        this.debut = debut;
    }
}