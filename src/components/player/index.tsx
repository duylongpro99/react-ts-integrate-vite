import React, { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import useSound from "use-sound";
import youBelongWithMe from "../../assets/taylor-youbelongwithme.mp3";

export interface ICurrentTime {
    min: number;
    sec: number;
}

export const PlayerComponent: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [play, { pause, duration, sound }] = useSound(youBelongWithMe);

    const [current, setCurrent] = useState<ICurrentTime>({
        min: 0,
        sec: 0,
    });

    const [time, setTime] = useState<ICurrentTime>({
        min: 0,
        sec: 0,
    });
    const [seconds, setSeconds] = useState<number>();

    useEffect(() => {
        const sec = (duration ?? 0) / 1000;
        const min = Math.floor(sec / 60);
        const remain = Math.floor(sec % 60);
        setTime({ sec: remain, min });
    }, [duration]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([])); // setting the seconds state with the current state
                const min = Math.floor(sound.seek([]) / 60);
                const sec = Math.floor(sound.seek([]) % 60);
                setCurrent({
                    min,
                    sec,
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="component">
            <h2>Playing now</h2>
            <img className="musicCover" src="https://picsum.photos/200/200" />
            <div>
                <h3 className="tile">You belong with me</h3>
                <p>Taylor Swift</p>
            </div>
            <div>
                <button className="play-button">
                    <IconContext.Provider
                        value={{ size: "3em", color: "#27AE60" }}
                    >
                        <BiSkipPrevious />
                    </IconContext.Provider>
                </button>

                {!isPlaying ? (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider
                            value={{ size: "3em", color: "#27AE60" }}
                        >
                            <AiFillPlayCircle />
                        </IconContext.Provider>
                    </button>
                ) : (
                    <button className="playButton" onClick={playingButton}>
                        <IconContext.Provider
                            value={{ size: "3em", color: "#27AE60" }}
                        >
                            <AiFillPauseCircle />
                        </IconContext.Provider>
                    </button>
                )}
                <button className="playButton">
                    <IconContext.Provider
                        value={{ size: "3em", color: "#27AE60" }}
                    >
                        <BiSkipNext />
                    </IconContext.Provider>
                </button>
            </div>

            <div>
                <div className="time">
                    <p>
                        {current.min}:{current.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                </div>
                <input
                    type="range"
                    min="0"
                    max={(duration ?? 0) / 1000}
                    value={seconds}
                    className="timeline"
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                />
            </div>
        </div>
    );
};

