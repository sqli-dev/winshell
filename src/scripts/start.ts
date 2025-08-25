import config from "../config.js"

let hidden = true;
let isHover;
const mouseEvents = () => {
    document.addEventListener('mousemove', (event) => {
        const optionsElement = document.querySelector("#options");
        const anyOpen = !!document.querySelector('.option.view');
        const isCursorNearEdge = event.clientX >= (innerWidth - 250);

        if (isCursorNearEdge && !hidden) {
            hidden = true;
            optionsElement.classList.remove("hide");
        } else if (!isCursorNearEdge && hidden && !anyOpen) {
            hidden = false;
            optionsElement.classList.add("hide");
        }
    });
    document.addEventListener('mousedown', () => {
        if (!isHover)
            quit();
    })
};

const me = () => {
    isHover = true;
}
const mq = () => {
    isHover = false;
}

const options: string[] = ["power"];
if (config.connection)
    options.push("connection");
if (config.sound)
    options.push("sound");

const toggleOption = (option: string): void => {
    quit();
    const copy: string[] = options.filter(op => op !== option);
    for (let op of copy) {
        document.querySelector(`#${op}`).className = 'option';
    }
    document.querySelector(`#${option}`).className = 'option view';
    document.querySelector(`#${option}`).querySelector('.sub').className = 'sub wait';
}
const quit = () => {
    const dom = document.querySelector('.option.view');
    if (!dom) return;
    dom.className = 'option';
    dom.querySelector('.sub').className = 'sub';
}

export {mouseEvents, toggleOption, mq, me}