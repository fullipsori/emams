{/* <button onClick={()=> fullscreen(document.getElementById("layout-wrapper"))}>Make FullScreen</button>
<button onClick={() => exitFullScreen()}>Exit FullScreen</button> */}

export const fullscreen = (element: any) => {
    if (element.requestFullscreen) return element.requestFullscreen()
    else if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
    else if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
    else if (element.msRequestFullscreen) return element.msRequestFullscreen()
}

export const exitFullScreen = () => {
    const documentElement = document as unknown as { 
        exitFullscreen: () => void;
        webkitCancelFullscreen: () => void;
        mozCancelFullScreen: () => void;
        msExitFullscreen: () => void;
    };
    if (documentElement.exitFullscreen) return documentElement.exitFullscreen()
    else if (documentElement.webkitCancelFullscreen) return documentElement.webkitCancelFullscreen()
    else if (documentElement.mozCancelFullScreen) return documentElement.mozCancelFullScreen()
    else if (documentElement.msExitFullscreen) return documentElement.msExitFullscreen()
}

export const toggleFullScreen = (element: any) => {
    const documentElement = document as unknown as { 
        exitFullscreen: () => void;
        webkitCancelFullscreen: () => void;
        mozCancelFullScreen: () => void;
        msExitFullscreen: () => void;
    };
    if (!document.fullscreenElement) {
        if (element.requestFullscreen) return element.requestFullscreen()
        else if (element.webkitRequestFullscreen) return element.webkitRequestFullscreen()
        else if (element.mozRequestFullScreen) return element.mozRequestFullScreen()
        else if (element.msRequestFullscreen) return element.msRequestFullscreen()
    } else {
        if (documentElement.exitFullscreen) return documentElement.exitFullscreen()
        else if (documentElement.webkitCancelFullscreen) return documentElement.webkitCancelFullscreen()
        else if (documentElement.mozCancelFullScreen) return documentElement.mozCancelFullScreen()
        else if (documentElement.msExitFullscreen) return documentElement.msExitFullscreen()
    }
}

/*
import {useRef} from "react";

export const useFullscreen = (callback: (val: boolean) => void) => {
    const element = useRef();
    const runCd = (isFull: boolean) => {
        if (callback && typeof callback === "function") {
            callback(isFull);
        }
    };
    const triggerFull = () => {
        const El_Curt = element.current as unknown as {
            msRequestFullscreen: () => void;
            webkitRequestFullscreen: () => void;
            MozRequestFullscreen: () => void;
            requestFullscreen: () => void;
        };
        if (El_Curt) {
            if (El_Curt.requestFullscreen) {
                El_Curt.requestFullscreen();
            } else if (El_Curt.MozRequestFullscreen) {
                El_Curt.MozRequestFullscreen();
            } else if (El_Curt.webkitRequestFullscreen) {
                El_Curt.webkitRequestFullscreen();
            } else if (El_Curt.msRequestFullscreen) {
                El_Curt.msRequestFullscreen();
            }
            runCd(true);
        }
    };
    const exitFull = () => {
        const documentElement = document as unknown as {
            webkitExitFullscreen: () => void;
            MozCancelFullscreen: () => void;
            exitFullscreen: () => void;
            webkitCancelFullscreen: () => void;
            mozCancelFullScreen: () => void;
            msExitFullscreen: () => void;
        };
        if (documentElement.exitFullscreen) {
            documentElement.exitFullscreen();
        } else if (documentElement.MozCancelFullscreen) {
            documentElement.MozCancelFullscreen();
        } else if (documentElement.webkitExitFullscreen) {
            documentElement.webkitExitFullscreen();
        } else if (documentElement.msExitFullscreen) {
            documentElement.msExitFullscreen();
        }
        runCd(false);
    };
    return { element, triggerFull, exitFull };
};
*/