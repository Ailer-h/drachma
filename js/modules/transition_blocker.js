let timeoutAction;
let timeoutEnable;

const style = document.createElement("style");
const css = document.createTextNode(`*, *::before, *::after {
    transition: none !important;
    animation: none !important;
    transform: none !important;
}`);

style.appendChild(css);

const disable = () => document.head.appendChild(style);
const enable = () => document.head.removeChild(style);

export function withoutTransition(fn) {
    
    clearTimeout(timeoutAction);
    clearTimeout(timeoutEnable);

    if (typeof window.getComputedStyle !== "undefined") {
        disable();
        fn();
        window.getComputedStyle(style).opacity;
        enable();
        return;
    }
 
    // Better method, requestAnimationFrame processes function before next repaint
    if (typeof window.requestAnimationFrame !== "undefined") {
        disable();
        fn();
        window.requestAnimationFrame(enable);
        return;
    }
 
    // Fallback
    disable();
    timeoutAction = setTimeout(() => {
        fn();
        timeoutEnable = setTimeout(enable, 120);
    }, 120);


}