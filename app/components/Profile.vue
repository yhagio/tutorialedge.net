<template>
    <div>
        
<div class="top-bar profile">
  <div class="container">
    <h2>Username: {{ user.nickname }}</h2>
    <br />
    <ul class="nav">
      <li class="nav-item bg-secondary"><a class="nav-link text-white" href="#">
          Settings</a></li>
      <li class="nav-item bg-secondary"><a class="nav-link text-white" href="#">
          Settings</a></li>
      <li class="nav-item bg-secondary"><button class="nav-link text-white" v-on:click="logout()">
          Logout</button></li>
    </ul>
  </div>
</div>

<div class="course-listing">
  <div class="container">
    <!-- <h3>Your Badges</h3>
  
  <div class="row">

    <div class="col-sm-2">
      <div class="badge">
        <img src="https://images.tutorialedge.nethttps://images.tutorialedge.net/images/python-logo.svg" alt="">
        <h3>Python</h3>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="badge">
        <img src="https://images.tutorialedge.nethttps://images.tutorialedge.net/images/golang.png" alt="">
        <h3>Golang</h3>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="badge">
        <img src="https://images.tutorialedge.nethttps://images.tutorialedge.net/images/rust-logo.png" alt="">
        <h3>Rust</h3>
      </div>
    </div>

    <div class="col-sm-2">
      <div class="badge">
        <img src="https://images.tutorialedge.nethttps://images.tutorialedge.net/images/angular.png" alt="">
        <h3>Angular</h3>
      </div>
    </div>

  </div> -->

    <h2>Your Courses</h2>

    <div class="row">

      <div class="col-lg-6">
        <div class="course-progress-box">
          <h2><small>Language</small>Golang</h2>
            <button class="btn btn-success">Continue Course</button>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="course-progress-box">
          <h2><small>Language</small><br />Python</h2>
            <button class="btn btn-success">Continue Course</button>
        </div>
      </div>

    </div>
  </div>
</div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data: function() {
        user: {}
    },
    methods: {
        logout: function() {
            this.$auth.logout();
        }
    },
    created: function() {
        if(this.$auth.isAuthenticated()) {
            this.user = this.$auth.user
        } else {
            window.location.replace("/")
        }
    }
}
</script>
