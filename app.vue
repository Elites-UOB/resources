<template>
  <div>
    <div class="pattern" z="-1" fixed left="0" top="0" h="screen" w="screen" />
    <div z="-1" fixed left="0" top="0" h="screen" w="screen" class="bg-gradient-to-t from-p dark:from-pd" />

    <NuxtPage />
  </div>
</template>

<style>
.dark .pattern {
  opacity: 0.6;
  background:
    radial-gradient(circle, transparent 20%, #0C0C0D 20%, #0C0C0D 80%, transparent 80%, transparent),
    radial-gradient(circle, transparent 20%, #0C0C0D 20%, #0C0C0D 80%, transparent 80%, transparent) 25px 25px,

    linear-gradient(#1E1E22 2px, transparent 2px) 0 -1px,
    linear-gradient(90deg, #1E1E22 2px, #0C0C0D 2px) -1px 0;

  background-size: 50px 50px, 50px 50px, 25px 25px, 25px 25px;
}

.pattern {
  opacity: 0.6;
  background:
    radial-gradient(circle, transparent 20%, #F3F3F2 20%, #F3F3F2 80%, transparent 80%, transparent),
    radial-gradient(circle, transparent 20%, #F3F3F2 20%, #F3F3F2 80%, transparent 80%, transparent) 25px 25px,

    linear-gradient(#dcdce0 2px, transparent 2px) 0 -1px,
    linear-gradient(90deg, #dcdce0 2px, #F3F3F2 2px) -1px 0;

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
  background: #dcdee0;
}

.dark ::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* @apply bg-red; */
  background: #1F2123;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #cccfd1;
}

.dark ::-webkit-scrollbar-thumb:hover {
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

.dark .markdown blockquote {
  background: rgba(63, 117, 255, 0.1);
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  border-radius: 5px;
  quotes: "\201C" "\201D" "\2018" "\2019";
}

.markdown blockquote {
  background: #0037c21a;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  border-radius: 5px;
  quotes: "\201C" "\201D" "\2018" "\2019";
}

.dark .markdown blockquote:before {
  color: #2E3239;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}

.markdown blockquote:before {
  color: #c6cad2;
  content: open-quote;
  font-size: 4em;
  line-height: 0.1em;
  margin-right: 0.25em;
  vertical-align: -0.4em;
}

.markdown blockquote p {
  display: inline;
}

.dark .markdown hr {
  border-color: #1E1E22;
}

.markdown hr {
  border-color: #dcdce0;
}

.dark .markdown a {
  color: #3F75FF;
  text-decoration: none;
}

.markdown a {
  color: #0037c2;
  text-decoration: none;
}

.markdown pre,
.dark .markdown pre code {
  background-color: #1E1E22;
  padding: 2.5px 10px;
  border-radius: 5px;
  text-align: left;
  direction: ltr;
  white-space: pre-wrap;
  /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
}

.markdown pre code {
  background-color: #dcdce0;
  padding: 2.5px 10px;
  border-radius: 5px;
  text-align: left;
  direction: ltr;
  white-space: pre-wrap;
  /* Since CSS 2.1 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
}

.dark .markdown code {
  background-color: #1E1E22;
  padding: 0px 5px;
  border-radius: 5px;
  direction: ltr;
}

.markdown code {
  background-color: #dcdce0;
  padding: 0px 5px;
  border-radius: 5px;
  direction: ltr;
}
</style>