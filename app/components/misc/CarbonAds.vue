<template>
    <div class="carbon-ads">
        <h3>Carbon Ads</h3>
        <script type="application/javascript" :src="this.src" :id="this.id"></script>
    </div>
</template>

<script>
export default {
  name: "CarbonAds",
  data: function() {
      return {
          id: "_carbonads_js",
          src: "//cdn.carbonads.com/carbon.js?serve=CE7DT2JJ&placement=tutorialedgenet"
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