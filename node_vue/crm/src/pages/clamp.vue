<template>
  <div class="clamp">
    <div class="words" id="clampjs">
      clamp (Number | String | 'auto'). This controls where and when to clamp the text of an element. Submitting a number controls the number of lines that should be displayed. Second, you can submit a CSS value (in px or em) that controls the height of the element as a String. Finally, you can submit the word 'auto' as a string. Auto will try to fill up the available space with the content and then automatically clamp once content no longer fits. This last option should only be set if a static height is being set on the element elsewhere (such as through CSS) otherwise no clamping will be done.
      useNativeClamp (Boolean). Enables or disables using the native -webkit-line-clamp in a supported browser (ie. Webkit). It defaults to true if you're using Webkit, but it can behave wonky sometimes so you can set it to false to use the JavaScript- based solution.
      truncationChar (String). The character to insert at the end of the HTML element after truncation is performed. This defaults to an ellipsis (…).
      truncationHTML (String). A string of HTML to insert before the truncation character. This is useful if you'd like to add a "Read more" link or some such thing at the end of your clamped node.
      splitOnChars (Array). Determines what characters to use to chunk an element into smaller pieces. Version 0.1 of Clamp.js would always remove each individual character to check for fit. With v0.2, you now have an option to pass a list of characters it can use. For example, it you pass an array of ['.', ',', ' '] then it will first remove sentences, then remove comma-phrases, and remove words, and finally remove individual characters to try and find the correct height. This will lead to increased performance and less looping when removing larger pieces of text (such as in paragraphs). The default is set to remove sentences (periods), hypens, en-dashes, em-dashes, and finally words (spaces). Removing by character is always enabled as the last attempt no matter what is submitted in the array.
      animate (Boolean). Silly little easter-egg that, when set to true, will animate removing individual characters from the end of the element until the content fits. Defaults to false.
    </div>
    <div
      class="words"
    >animate (Boolean). Silly little easter-egg that, when set to true, will animate removing individual characters from the end of t</div>
    <el-button @click="clamp">按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    clamp() {}
  }
};
</script>

<style>
.words {
  margin: 20px;
  font-size: 14px;
  color: #4a4a4a;
  overflow: hidden;
  line-height: 26px;
  position: relative;
  height: 45px;
  word-break: break-all;
  word-wrap: break-word;
}
.words:after {
  content: "...";
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 1.8em;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 1) 50%
  );
}
</style>
