<template>
  <div>
    <div id="pattern" z="-1" fixed left="0" top="0" h="screen" w="screen" class="bg-gradient-to-r from-indigo-500" />
    <div z="-1" fixed left="0" top="0" h="screen" w="screen" class="bg-gradient-to-t from-p" />

    <NuxtPage />
  </div>
</template>

<style>
#pattern {
  /* background-color: #0C0C0D; */
  opacity: 0.4;
  background: 
              radial-gradient(circle, transparent 20%, #0C0C0D 20%, #0C0C0D 80%, transparent 80%, transparent),
              radial-gradient(circle, transparent 20%, #0C0C0D 20%, #0C0C0D 80%, transparent 80%, transparent) 25px 25px,
              
              linear-gradient(#1E1E22 2px, transparent 2px) 0 -1px,
              linear-gradient(90deg, #1E1E22 2px, #0C0C0D 2px) -1px 0;
              
  background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
}

/* width */
::-webkit-scrollbar {
  width: 7.5px;
}

/* Track */
::-webkit-scrollbar-track {
  /* background: #0C0C0D; */
}

/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* @apply bg-red; */
  background: #1F2123;

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #2d3032;
}

.slide-down-enter-active,
.slide-down-leave-active {
    transition: opacity 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
    opacity: 0;
}
</style>