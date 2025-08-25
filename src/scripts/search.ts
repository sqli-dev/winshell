import {ref} from "vue";

const view = ref(false);
const state = ref(false);
const focused = ref(false);
const lastView = ref(false);
const lastState = ref(false);

const toggleView = (value: boolean) => {
    const element = document.querySelector("#s_inp") as HTMLInputElement;
    if (!element) return;
    if ((element.value.trim().length > 0 || focused.value) && !value) return;
    view.value = value;
};

const hover = (value: boolean) => {
    lastView.value = value;
    lastState.value = value;
    const element = document.querySelector("#s_inp") as HTMLInputElement;
    if (!element) return;
    if ((element.value.trim().length > 0 || focused.value) && !value) return;
    state.value = value;
    if (!value)
        view.value = value;
};

const toggleFocus = (value: boolean) => {
    focused.value = value;
    if (!value && (!lastView.value || !lastState.value))
        hover(false);
}

/*
Handle result animation
 */
const result = ref<string[]>([]);
const searchBox = ref<HTMLElement | null>(null);
const resultBox = ref<HTMLElement | null>(null);
let timeout;
const duration = 300;
const em = 16;
const baseHeight = 3.5 * em;
const resultHeight = {
    base: 16,
    each: 4 * em
}

const initRef = (searchBoxElement: HTMLElement | null, resultBoxElement: HTMLElement | null) => {
    if (!searchBoxElement || !resultBoxElement) return;
    searchBox.value = searchBoxElement;
    resultBox.value = resultBoxElement;
}

const onResult = (results: string[]) => {
    result.value = results;
    const calculateHeight = baseHeight + resultHeight.each * results.length * (results.length == 1 ? 1.2 : 1);
    clearTimeout(timeout);
    if (results.length == 0) {
        resultBox.value.style.opacity = `0`;
        resultBox.value.style.pointerEvents = `none`;
        timeout = setTimeout(() => {
            searchBox.value.style.height = `${baseHeight}px`;
        }, duration)
    } else if (searchBox.value && resultBox.value) {
        searchBox.value.style.height = `${calculateHeight}px`;
        timeout = setTimeout(() => {
            resultBox.value.style.pointerEvents = `unset`;
            resultBox.value.style.opacity = `1`;
        }, duration)
    }
}

export {hover, toggleView, toggleFocus, view, state, initRef, onResult, result}