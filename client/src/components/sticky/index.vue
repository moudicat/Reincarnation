<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className"
         :style="{top:stickyTop+'px',zIndex:zIndex,position:position,width:width,height:height+'px'}">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Sticky',
    props: {
      stickyTop: {
        type: Number,
        default: 0
      },
      zIndex: {
        type: Number,
        default: 1000
      },
      className: {
        type: String
      }
    },
    data() {
      return {
        active: false,
        position: '',
        currentTop: '',
        width: undefined,
        height: undefined,
        child: null,
        stickyHeight: 0
      };
    },
    methods: {
      sticky() {
        if (this.active) {
          return;
        }
        this.position = 'fixed';
        this.active = true;
        this.width = this.width + 'px';
        this.$store.commit('header/SET_AVATAR', true);
        this.$store.commit('components/SET_TAKEMEFLY', true);
      },
      reset() {
        if (!this.active) {
          return;
        }
        this.position = '';
        this.width = 'auto';
        this.active = false;
        if (this.$route.name !== 'Article') {
          this.$store.commit('header/SET_AVATAR', false);
        }
        this.$store.commit('components/SET_TAKEMEFLY', false);
      },
      handleScroll() {
        this.width = this.$el.getBoundingClientRect().width;
        const offsetTop = this.$el.getBoundingClientRect().top;
        if (offsetTop <= this.stickyTop) {
          this.sticky();
          return;
        }
        this.reset();
      }
    },
    mounted() {
      this.height = this.$el.getBoundingClientRect().height;
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  };
</script>
