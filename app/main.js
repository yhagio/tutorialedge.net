import { initComments } from './comments/comments.js';

document.addEventListener("DOMContentLoaded", function(event) {
  let commentsSection = document.getElementById("comments-section")
  if(typeof commentsSection !== 'undefined') {
    initComments();
  }
});
  
