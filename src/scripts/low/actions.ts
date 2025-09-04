import {ref} from "vue";
import { invoke } from '@tauri-apps/api/core';

import fastFrames from "../moon";

const locked = ref<boolean>(false);
const shutdown = "shutdown -s -t 0"
const restart = "shutdown -r -t 0"
const sleep = "rundll32.exe powrprof.dll,SetSuspendState 0,1,1";
const lock = (value: 0|1) => {
    locked.value = value == 1;
    fastFrames.value = 60 * (value+0.5);
};

const command = (value: string) => {
    invoke('run_ps', {command: value}).then(console.log).catch(console.error);
}


export {lock, locked, command , shutdown, restart, sleep};