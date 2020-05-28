<template>
    <div>
         <div class="social-btns">
            <ShareNetwork
                network="facebook"
                :url="url"
                :title="title"
                :description="description"
                :quote="quote"
                :hashtags="hashtags">
                <button class="btn facebook"><i class="fa fa-facebook"></i></button>
            </ShareNetwork>
            
            <ShareNetwork
                network="twitter"
                :url="url"
                :title="title"
                :quote="quote"
                :hashtags="hashtags"
                twitter-user="ElliotF">
                <button class="btn twitter"><i class="fa fa-twitter"></i></button>
            </ShareNetwork>

            <ShareNetwork
                network="email"
                :url="url"
                :title="title"
                :description="description">
                <button class="btn codepen"><i class="fa fa-envelope"></i></button>
            </ShareNetwork>

            <ShareNetwork
                network="reddit"
                :url="url"
                :title="title">
                <button class="btn reddit"><i class="fa fa-reddit-alien"></i></button>
            </ShareNetwork>

            <ShareNetwork
                network="HackerNews"
                :url="url"
                :title="title">
                <button class="btn hacker-news"><i class="fa fa-hacker-news"></i></button>
            </ShareNetwork>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SocialShare',
    data: function() {
        return {
            url: "TutorialEdge",
            title: "Title",
            description: "",
            quote: "",
            hashtags: []
        }
    },
    created: function() {   
        let meta = document.getElementsByTagName("META");
        this.url = window.location;
        this.title = meta.title;
        this.description = meta.description;
    }
}
</script>

<style lang="scss">

.social-btns .btn,
.social-btns .btn:before,
.social-btns .btn .fa {
  transition: all 0.35s;
  transition-timing-function: cubic-bezier(0.31, -0.105, 0.43, 1.59);
}
.social-btns .btn:before {
  top: 90%;
  left: -110%;
}
.social-btns .btn .fa {
  -webkit-transform: scale(0.8);
  transform: scale(0.8);
}
.social-btns .btn.facebook:before {
  background-color: #3B5998;
}
.social-btns .btn.facebook .fa {
  color: #3B5998;
}
.social-btns .btn.twitter:before {
  background-color: #33CCFF;
}
.social-btns .btn.twitter .fa {
  color: #33CCFF;
}
.social-btns .btn.codepen:before {
  background-color: #212121;
}
.social-btns .btn.codepen .fa {
  color: #212121;
}
.social-btns .btn.reddit:before {
  background-color: #FF4500;
}
.social-btns .btn.reddit .fa {
  color: #FF4500;
}
.social-btns .btn.hacker-news:before {
  background-color: #FF6600;
}
.social-btns .btn.hacker-news .fa {
  color: #FF6600;
}
.social-btns .btn:focus:before,
.social-btns .btn:hover:before {
  top: -10%;
  left: -10%;
}
.social-btns .btn:focus .fa,
.social-btns .btn:hover .fa {
  color: #fff;
  -webkit-transform: scale(1);
  transform: scale(1);
}
.social-btns {
  height: 60px;
  margin: auto;
  font-size: 0;
  text-align: center;
}
.social-btns .btn {
  display: inline-block;
  background-color: #fff;
  width: 60px;
  height: 60px;
  line-height: 60px;
  margin: 0 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-radius: 28% !important;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.1);
  opacity: 0.99;
}
.social-btns .btn:before {
  content: "";
  width: 120%;
  height: 120%;
  position: absolute;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.social-btns .btn .fa {
  font-size: 28px;
}


</style>