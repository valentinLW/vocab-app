import { useState, useEffect } from "react";
import { GoUnmute, GoMute } from "react-icons/go";

const useAudio = (url, playOnStart) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(playOnStart);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing, audio]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

export function AudioPlayer({ url, playOnStart=false, display=true }) {
  const [playing, toggle] = useAudio(url, playOnStart);

  return (
    <div className="audio-player" style={{display: display ? "block" : "none"}}>
      {!playing && <GoUnmute onClick={toggle}/>}
      {playing && <GoMute onClick={toggle}/>}
    </div>
  );
};
