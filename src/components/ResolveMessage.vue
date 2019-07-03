<template>
  <span class="message message--error" v-if="resolveMessage.error">{{resolveMessage.content}}</span>
  <span class="message message--success" v-else>{{resolveMessage.content}}</span>
</template>
<script>
export default {
  props: ['resolveMessage']
}
</script>
<style scoped lang="scss">
@import "../scss/_vars.scss";
.message {
  display: block;
  background: $main-red;
  width: 60%;
  margin-left: 20%;
  padding: 20px;
  color: #fff;
  margin-bottom: 20px;

  &--error {
    background: $main-red;
  }

  &--success {
    background: none;
    color: $main-yellow;
    text-align: left;
    padding: 0;
    font-size: 36px;
    margin-top: 40px;
    margin-bottom: 20px;
    font-weight: 700;
  }
}
@media (max-width: 640px) {
  .message {
    width: 90%;
    margin-left: 5%;
    margin-top: 10px;

    &--success {
      font-size: 18px;
    }
   }
 }
</style>
