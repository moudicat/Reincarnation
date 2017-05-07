<template>
  <header>
    <h1>某迪猫|结束与起始之界</h1>
    <div class="background-wrapper">
      <div class="hitokoto-wrapper">
        <p class="hitokoto">『记性太好，有时候是一种负担。容易忘记往事的人，是幸福的。』</p>
      </div>
    </div>
    <Sticky>
      <div class="nav-wrapper">
        <div class="nav-container">
          <div class="avatar-wrapper" :class="{mini: miniAvatarState}">
            <img src="https://pbs.twimg.com/profile_images/803241866992885760/4DMjQyIa_400x400.jpg" alt="avatar">
          </div>
          <div class="profile-mini-wrapper" :class="{mini: miniAvatarState}">
            <div class="profile-mini">
              <img src="https://pbs.twimg.com/profile_images/803241866992885760/4DMjQyIa.jpg" alt="mini-avatar">
              <div class="info">
                <h3>某迪</h3>
                <p>More cooperation, no competition.</p>
              </div>
            </div>
          </div>
          <nav>
            <router-link to="/index" class="nav-link">
              <span>文章</span>
            </router-link>
            <router-link to="/animation" class="nav-link">
              <span>番剧列表</span>
            </router-link>
            <router-link to="/links" class="nav-link">
              <span>友情链接</span>
            </router-link>
            <router-link to="/about" class="nav-link">
              <span>关于本站</span>
            </router-link>
          </nav>
        </div>
      </div>
    </Sticky>
  </header>
</template>

<script type="text/ecmascript-6">
  import Sticky from 'components/Sticky';

  export default {
    computed: {
      miniAvatarState() {
        return this.$store.state.header.miniAvatarState;
      }
    },
    components: {
      Sticky
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  header {
    flex: 0 0 460px;
    height: 460px;
    h1 {
      display: none;
      font-size: 0;
      text-indent: -9999px;
    }
    .background-wrapper {
      height: 400px;
      background: url("https://pbs.twimg.com/profile_banners/744048673/1476969370/1500x500");
      background-size: cover;
      .hitokoto-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        width: 100%;
        .hitokoto {
          text-shadow: #aaaaaa 1px 1px 1px;
          font-size: 32px;
          color: rgba(255, 255, 255, .8);
          transition: .4s;
          &:hover {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .nav-wrapper {
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
      background-color: #fff;
    }
    .nav-container {
      display: flex;
      position: relative;
      height: 60px;
      max-width: 1190px;
      margin: 0 auto;
      background-color: #fff;
      .avatar-wrapper {
        position: absolute;
        top: -95px;
        left: 10px;
        z-index: 1001;
        width: 190px;
        height: 190px;
        border: 5px solid #fff;
        border-radius: 12px;
        box-shadow: 0 1px 1px rgba(136,153,166,0.15);
        overflow: hidden;
        transition: .6s;
        > img {
          width: 180px;
          height: 180px;
        }
        &.mini {
          height: 0;
        }
      }
      .profile-mini-wrapper {
        width: 20%;
        height: 60px;
        margin-left: 10px;
        padding-top: 60px;
        transition: .6s;
        overflow: hidden;
        .profile-mini {
          display: flex;
          justify-content: space-around;
          padding: 10px 0;
          transition: .5s .3s opacity;
          opacity: .1;
          > img {
            width: 40px;
            height: 40px;
            border-radius: 5px;
          }
          .info {
            > h3 {
              color: #14171a;
              font-size: 18px;
              font-weight: 700;
            }
            > p {
              color: #FF705F;
              font-size: 12px;
              white-space: nowrap;
            }
          }
        }
        &.mini {
          padding-top: 0;
          .profile-mini {
            opacity: 1;
          }
        }
      }
      nav {
        display: flex;
        padding-left: 5.6%;
        .nav-link {
          display: block;
          padding: 20px 20px;
          transition: .4s;
          border-bottom: 1px solid transparent;
          &.active {
            border-bottom: 4px solid #ff9f71;
          }
          &:hover {
            border-bottom: 4px solid #ffbb9d;
          }
          > span {
            color: #2e2f2f;
          }
        }
      }
    }
  }
</style>