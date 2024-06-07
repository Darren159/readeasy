import { FC, PropsWithChildren } from 'react';
type FCC = FC<PropsWithChildren>;

type GazePoint = {
    x: number;
    y: number;
}

export type { GazePoint, FCC };