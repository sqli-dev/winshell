import {ref} from "vue";
import {command, restart, shutdown, sleep} from "../low/actions.ts";

const current = ref("shutdown");
const title = ref("Shutdown");
const timeleft = ref(30);


const cancelAction = () => {
    current.value = ''
    document.querySelector("#shadow").classList.add("none");
    document.querySelector("#popup").classList.add("none");
}

const countdown = () => {
    timeleft.value--;
    if (timeleft.value <= 0 && current.value.length > 0) {
        forceAction()
    }
}
let i = setInterval(countdown, 1000)
const perform = (action: string) => {
    clearInterval(i);
    timeleft.value = 30;
    current.value = action;
    switch (action) {
        case "shutdown":
            title.value = "Shutdown";
            break;
        case "restart":
            title.value = "Restart";
            break;
        case "sleep":
            title.value = "Sleep";
            break;
    }
    i = setInterval(countdown, 1000)
    document.querySelector("#shadow").classList.remove("none");
    document.querySelector("#popup").classList.remove("none");
}

const forceAction = () => {
    clearInterval(i);
    console.log('forcing...', current.value)
    switch (current.value) {
        case "shutdown":
            command(shutdown);
            break;
        case "restart":
            command(restart);
            break;
        case "sleep":
            command(sleep);
            break;
    }
}
export {perform, cancelAction, title, current, timeleft, forceAction}