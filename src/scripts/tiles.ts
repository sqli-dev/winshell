import { ref } from "vue";

const initialized = ref(false);
const boxHover = ref<boolean>(false);
const tileBox = ref<HTMLElement | null>(null);
const tiles = ref<HTMLElement[] | null>(null);
const tileDataMap = new Map<HTMLElement, {
    img: HTMLImageElement;
    lastScale: number;
    lastTranslateY: number;
    animation: Animation | null;
}>();
const baseScale = 1;
const maxScale = 1.2;
const growthThreshold = 0.6;

// anim config
const ANIM_DURATION = 300;
const ANIM_EASING = "ease-out";
const MIN_SCALE_DIFF = 0.005;
const MIN_TRANSLATE_DIFF = 0.05;

const init = (box: HTMLElement, tilesArray: HTMLElement[]) => {
    tileBox.value = box;
    tiles.value = tilesArray;
    for (const tile of tilesArray) {
        const img = tile.querySelector("img");
        if (img) {
            img.style.transform = `scale(${baseScale}) translateY(0)`;
            tileDataMap.set(tile, {
                img,
                lastScale: baseScale,
                lastTranslateY: 0,
                animation: null
            });
        }
    }
    initialized.value = true;
};

const onHover = (state: boolean) => {
    boxHover.value = state;
    if (!state) {
        for (const tile of tiles.value || []) {
            const tileData = tileDataMap.get(tile);
            if (!tileData) continue;

            if (tileData.lastScale === baseScale && tileData.lastTranslateY === 0) continue;

            animateTile(tileData, baseScale, 0);
        }
    }
};

const animateTile = (
    tileData: {
        img: HTMLImageElement;
        lastScale: number;
        lastTranslateY: number;
        animation: Animation | null;
    },
    targetScale: number,
    targetTranslateY: number
) => {
    if (tileData.animation) {
        tileData.animation.cancel();
    }

    tileData.animation = tileData.img.animate(
        [
            {
                transform: `scale(${tileData.lastScale}) translateY(${tileData.lastTranslateY}px)`
            },
            {
                transform: `scale(${targetScale}) translateY(${targetTranslateY}px)`
            }
        ],
        {
            duration: ANIM_DURATION,
            easing: ANIM_EASING,
            fill: "forwards"
        }
    );

    tileData.lastScale = targetScale;
    tileData.lastTranslateY = targetTranslateY;

    tileData.animation.addEventListener("finish", () => {
        tileData.animation = null;
    });
};

let rafId: number | null = null;
const mouseMove = (event: MouseEvent) => {
    if (!initialized.value || !boxHover.value || !tileBox.value) return;

    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
        rafId = null;
        const threshold = tileBox.value!.clientWidth * growthThreshold;
        const cursorX = event.clientX;

        for (const tile of tiles.value || []) {
            const tileData = tileDataMap.get(tile);
            if (!tileData) continue;

            const rect = tile.getBoundingClientRect();
            const tileCenter = rect.left + rect.width / 2;
            const distance = Math.abs(tileCenter - cursorX);
            const t = Math.max(0, 1 - Math.min(1, distance / threshold));

            const scale = baseScale + t * (maxScale - baseScale);
            const translateY = t * -2;

            const scaleDiff = Math.abs(scale - tileData.lastScale);
            const translateYDiff = Math.abs(translateY - tileData.lastTranslateY);

            if (scaleDiff > MIN_SCALE_DIFF || translateYDiff > MIN_TRANSLATE_DIFF) {
                animateTile(tileData, scale, translateY);
            }
        }
    });
};

export { mouseMove, onHover, init };