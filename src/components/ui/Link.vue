<template>
    <span class="link">
        <slot></slot>
    </span>
</template>

<script setup lang="ts"></script>

<style lang="scss">
span.link {
    display: inline;
    text-decoration: none;
    color: var(--on-surface);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    border-bottom: 0.1rem dashed currentColor;
    font-style: italic;

    * {
        color: inherit;
    }

    > i {
        margin-right: 0.4rem;
    }

    &:hover {
        color: var(--primary-alt);
    }
}
</style>
