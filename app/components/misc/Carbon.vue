<template>
    <div class="carbon-ads">
        <script type="application/javascript" :src="this.src" :id="this.id"></script>
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
  created: function() {
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
