<template>
    <button
        class="btn"
        :class="{
            'btn--mini': mini,
            'btn--icon': icon,
            'btn--disabled': disabled,
            'btn--primary': primary,
            'btn--danger': danger,
            'btn--square': square,
            pressed: pressed || disabled,
            'full-width': fullWidth,
            'full-width-mobile': fullWidthMobile
        }"
        :disabled="disabled"
    >
        <div class="btn__shadow"></div>
        <div class="btn__content"><slot></slot></div>
    </button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    mini: Boolean,
    icon: Boolean,
    primary: Boolean,
    danger: Boolean,
    disabled: Boolean,
    fullWidth: Boolean,
    fullWidthMobile: Boolean,
    pressed: Boolean,
    square: Boolean
});
</script>

<style lang="scss" scoped>
button {
    position: relative;
    background-color: transparent;
    flex-shrink: 0;
}

.full-width > .btn__content {
    justify-content: center;
}

.btn__content {
    position: relative;
    top: -0.2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    height: 3.2rem;
    padding: 0 1.2rem;
    border-radius: 5px;
    background-color: var(--background);
    border: 1px solid var(--surface-border);
    cursor: pointer;
    transition: all 0.1s ease-in-out;
}

button.pressed > .btn__content,
.btn__content:active,
.btn__content:focus {
    transition: unset;
    filter: brightness(0.95);
    top: 0;
}

.btn__shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: var(--surface-border);
}

// Primary button
.btn--primary {
    .btn__content {
        background-color: var(--primary);
        border: 1px solid var(--primary-alt);
        * {
            color: var(--background);
        }
    }
    .btn__shadow {
        background-color: var(--primary-alt);
    }
}

.btn--square {
    width: 3.65rem; // Same as when just an icon is in it
    > .btn__content {
        padding: 0;
        justify-content: center;
    }
}

// Danger button
.btn--danger {
    .btn__content {
        background-color: var(--danger);
        border: 1px solid var(--danger-alt);
        * {
            color: var(--background);
        }
    }
    .btn__shadow {
        background-color: var(--danger-alt);
    }
}

// Icon-only button
.btn.btn--icon {
    .btn__content {
        width: 3.2rem;
        height: 3.2rem;
        background-color: transparent;
        border: none;
        top: 0;
        justify-content: center;
        align-items: center;
    }
    .btn__shadow {
        background-color: transparent;
    }
}

// Mini button
.btn.btn--mini {
    .btn__content {
        padding: 0.2rem;
        width: unset;
        height: unset;
    }
}

// Disabled
.btn--disabled {
    pointer-events: none;
    opacity: 0.4;

    .btn__shadow {
        background-color: transparent;
    }
}

@media (max-width: 768px) {
    .full-width-mobile {
        width: 100%;
        .btn__content {
            justify-content: center;
        }
    }
}
</style>
