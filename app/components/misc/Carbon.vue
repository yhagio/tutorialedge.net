<template>
    <div class="carbon-ads">
    </div>
</template>

<script>
export default {
  name: "Carbon",
  data: function() {
      return {
          id: "_carbonads_js",
          src: "//cdn.carbonads.com/carbon.js?serve=CE7DT2JJ&placement=tutorialedgenet"
      }
  },
  mounted: function() {
    this.$el.innerHTML = ''
    this.load()
  },
  methods: {
    load() {
        const s = document.createElement('script')
        s.id = this.id;
        s.src = this.src;
        this.$el.appendChild(s)
    }
  }
};
</script>

<style lang="scss">
.carbon-ads {
  margin-top: 60px;
}
</style>
