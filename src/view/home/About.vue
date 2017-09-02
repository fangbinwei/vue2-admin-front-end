<template>
  <div>
    <div class="container">
      <div class="row justify-content-sm-around justify-content-center mb-5 align-items-center">
        <div class="profile col-10 col-sm-4">
          <div class="profile-image">
            <img src="http://i1.piimg.com/567571/d5b3c0f3ca1250fd.jpg" alt="profile-image" />
          </div>
          <h2>Sleepwalker</h2><span>开始慢慢相信平行世界的尽头有一个我活成我曾经想要的样子</span>
        </div>
        <div class="col-sm-5 col-12 about-content">
          <h3>Contact</h3>
          <pre class="codehilite">
              <code>python -c "import base64; print base64.b64decode('MTUwNjg3MDU0NTQ=')"</code>
            </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .profile {
    background: #333;
    box-shadow: 5px 5px 10px #669999;
    border-radius: 2%;
    padding: 1rem 1rem 1rem;
    text-align: center;
    width: 15rem;
  }
  .profile-image{
    display: block;
    width: 7.5rem;
    height: 7.5rem;
    overflow: hidden;
    border-radius: 10%;
    margin: 0 auto;
    background: rgba(250, 214, 195, 1);
    border: 4px solid rgba(250, 214, 195, 1);
  }
  .profile-image img {
    max-width: 100%;
    border-radius: 10%;
    filter: grayscale(0);
    -webkit-transition: filter 0.3s;
    -moz-transition: filter 0.3s;
    -o-transition: filter 0.3s;
    transition: filter 0.5s;

  }
  .profile-image img:hover{
    filter: grayscale(100%);
  }
  .profile h2 {
    color: #f3f3f3;
    font-size: 1.3rem;
    margin-top: 0.5em;
    font-weight: normal;
  }
  .profile span {
    font-size: 0.75rem;
    font-weight: 300;
    display: block;
    color: rgba(171, 205, 239, 0.8);
    margin-top: 0.25rem;
    padding-top: 0.25rem;
    border-top: 1px solid rgba(171, 205, 239, 1);
  }
  .about-content h3 {
    margin-top: 20px;
  }
  code {
    display: block;
    padding: 1.2em 1.4em;
    line-height: 1.5em;
    margin: 0;
    color: #525252;
    border-radius: 0;
    white-space: pre;
    overflow-x: auto;
  }
  pre {
    display: block;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 90%;
    color: #292b2c;
    overflow: auto;
  }
  .codehilite {
    background: #f8f8f8;
  }
</style>
