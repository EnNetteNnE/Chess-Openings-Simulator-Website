import React, { FC } from "react";
import { Figure } from "../models/figures/Figure";

interface LostFiguresProps {
    title: string;
    figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <p className = "lost">
            <h3>{title}</h3>
            {figures.map(figure => 
                <p key={figure.id}>
                    {figure.logo && <img width={20} height={20} src={figure.logo}/>}
                </p>
            )}
        </p>
    );
};

export default LostFigures;