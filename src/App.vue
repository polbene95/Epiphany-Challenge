// eslint-disable

<template>
  <div id="app">
    <div id="survey-one" class="survey active-survey">
      <div class="header">
        <p>How do you feel aboy these quotes?</p>
      </div>
      <div class="body">
        <div class="image-carrusel">
          <img
            v-for="(image,index) in carrusel"
            :class="{next: nextImage == index, leave: previusImage == index, current: currentImage == index}"
            :key="index"
            :src="image"
            alt="survey image"
          />
        </div>
        <div class="buttons">
          <div
            v-for="(btn, index) in buttons"
            :key="index"
            class="btn"
            @click="showNextImage(btn.status)"
          >
            <img :src="btn.image" alt />
            <p>{{btn.text}}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="survey-two" class="survey"></div>
    <div id="survey-three" class="survey"></div>
    <button class="next-survey-btn">></button>
  </div>
</template>

<script>
import image1 from "./assets/img_statement_1.png";
import image2 from "./assets/img_statement_2.png";
import image3 from "./assets/img_statement_3.png";
import image4 from "./assets/img_statement_4.png";
import image5 from "./assets/img_statement_5.png";
import image6 from "./assets/img_statement_6.png";

import happyCat from "./assets/img_cat_happy.png";
import neutralCat from "./assets/img_cat_neutral.png";
import sadCat from "./assets/img_cat_supersad.png";
// C:\Users\Pol\Desktop\epiphany-vue-challenge-master\src\assets\img_statement_6.png

export default {
  // name: "App",
  data() {
    return {
      carrusel: [image1, image2, image3, image4, image5, image6],
      buttons: [
        {
          image: sadCat,
          text: "Hiss",
          status: "sad",
        },
        {
          image: neutralCat,
          text: "Meow",
          status: "neutral",
        },
        {
          image: happyCat,
          text: "Prrr",
          status: "happy",
        },
      ],
      previusImage: null,
      currentImage: 0,
      nextImage: 1,
    };
  },
  created() {},
  methods: {
    showNextImage() {
      if (this.currentImage !== 5) {
        this.previusImage = this.currentImage;
        this.currentImage++;
        this.nextImage++;
      } else {
        console.log("end");
      }
    },
  },
};
</script>

<style lang="scss">
$light-blue: #a2d7e9;
$dark-blue: #4291ac;
$white: #fffffff3;

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
  height: 100vh;
  background: rgba($light-blue, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .survey {
    margin-right: 10px;
  }

  .next-survey-btn {
    // margin-left: 25px;
    border: 0;
    color: #fffffff3;
    background: #c3bfbf;
    padding: 7px 12px;
    font-family: inherit;
    border-radius: 5px;
    font-size: 1.5rem;
  }

  #survey-one {
    width: 700px;
    height: 620px;
    color: $white;

    .header {
      width: 100%;
      height: 8%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px 5px 0 0;
      background: $light-blue;
      font-weight: bold;
      font-size: 1.1rem;
    }

    .body {
      border-top: 2px solid #c2dee7;
      border-radius: 0 0 5px 5px;
      background: $dark-blue;
      width: 100%;
      height: 92%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .image-carrusel {
        width: 100%;
        height: 65%;
        display: flex;
        justify-content: center;
        align-items: center;

        .slide-leave-active,
        .slide-enter-active {
          transition: 1s;
        }

        overflow: hidden;
        position: relative;

        img {
          width: 80%;
          height: 80%;
          border-radius: 5px;

          position: absolute;
          top: 50%;
          right: -150%;
          transform: translate(-50%, -50%);

          &.current {
            transition: 1s;
            right: -30%;
          }

          &.next {
            transition: 1s;
            right: -135%;
          }

          &.leave {
            transition: 1s;
            right: 100%;
            animation: fade-out 2s;
          }
        }
      }

      .buttons {
        width: 70%;
        height: 35%;
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;

        .btn {
          width: 30%;
          height: 50%;
          background: $white;
          border-radius: 5px;
          img {
            width: 100%;
            height: 100%;
          }
          p {
            // position: relative;
            text-align: center;
            // top: 100%;
          }
        }
      }
    }
  }
}
</style>
