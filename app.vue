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

.markdown h1 {
  font-size: 1.5em;
}
.markdown h2 {
  font-size: 1.25em;
}
.markdown h3 {
  font-size: 1em;
}
.markdown h4 {
  font-size: 0.75em;
}
.markdown h5 {
  font-size: 0.5em;
}
.markdown h6 {
  font-size: 0.25em;
}

.markdown table {
  border-spacing: 0;
  text-align: right;
}

.markdown th {
  background-color: #1E1E22;
  padding: 2.5px 10px;
  border-right: 1px solid #111113;
}
.markdown th:first-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.markdown th:last-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.markdown td {
  padding: 2.5px 10px;
}

.markdown blockquote {
  background: rgba(63, 117, 255, 0.1);
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  border-radius: 5px;
  quotes: "\201C""\201D""\2018""\2019";
}
.markdown blockquote:before {
  color: #2E3239;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}
.markdown blockquote p {
  display: inline;
}
.markdown hr {
  border-color: #1E1E22;
}
.markdown a {
  color: #3F75FF;
  text-decoration: none;
}
.markdown pre {
  background-color: #1E1E22;
  padding: 2.5px 10px;
  border-radius: 5px;
  text-align: left;
  direction: ltr;
}
</style>