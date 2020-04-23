<template>
    <div>
        <h4>Carbon Ads</h4>
        <script v-bind:src="this.src" v-bind:id="this.id"></script>
    </div>
</template>

<script>
export default {
  name: "CarbonAds",
  data: function() {
    return {
        src: "//cdn.carbonads.com/carbon.js?serve=CE7DT2JJ&placement=tutorialedgenet",
        id: "_carbonads_js"
    }
  }
};
</script>

<style lang="scss">
.carbon-ads {
  min-height: 102px;
  padding: 1.5rem 1.5rem 0;
  margin-bottom: -0.5rem;
  font-size: 0.75rem;
  a {
    color: #444;
    font-weight: normal;
    display: inline;
  }
  .carbon-img {
    float: left;
    margin-right: 1rem;
    border: 1px solid #e7e7e7;
    img {
      display: block;
    }
  }
  .carbon-poweredby {
    color: #999;
    display: block;
    margin-top: 0.5em;
  }
}
@media (max-width: 640px) {
  .carbon-ads {
    .carbon-img img {
      width: 100px;
      height: 77px;
    }
  }
}
</style>