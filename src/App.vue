// eslint-disable

<template>
  <div class="wrapper">
    <div id="app" class="container">
      <div class="prev-container" :class="{hide: currentSurvey == 1}">
        <div class="previus-survey-btn survey-btn" @click="showPreviusSurvey">&#60;</div>
      </div>
      <div id="survey-one" :class="{active_survey: currentSurvey == 1}" class="survey">
        <div class="header">
          <p>How do you feel about these quotes?</p>
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
      <div id="survey-two" :class="{active_survey: currentSurvey == 2}" class="survey">
        <div class="header">
          <p>How do you feel about these quotes?</p>
        </div>
        <div class="body" v-if="!finishedSurvey">
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
            <div class="stars">
              <span
                v-for="index in 5"
                :key="index"
                @click="showNextImage"
                @mouseover="selectRate(index)"
                :class="{selected : selectedRate >= index}"
              >&#9734;</span>
            </div>
            <div class="text">
              <p class="left">does not fit at all</p>
              <p class="right">fits very well</p>
            </div>
          </div>
        </div>
        <div class="completed" v-if="finishedSurvey">
          <div class="check-mark">&#10003;</div>
        </div>
      </div>
      <div id="survey-three" :class="{active_survey: currentSurvey == 3}" class="survey">
        <div class="header">
          <p>How do you feel about these quotes?</p>
        </div>
        <div class="body" v-if="!finishedSurvey">
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
              :class="{selectedBox : selectedBoxes.indexOf(index) != -1}"
              @click="selectBox(index)"
            >
              <img :src="btn.image" alt />
              <p>{{btn.text}}</p>
            </div>
          </div>
          <div class="next-image-button">
            <p :class="{active: selectedBoxes.length > 0}" @click="nextQuestionEvent">Next</p>
          </div>
        </div>
        <div class="completed" v-if="finishedSurvey">
          <div class="check-mark">&#10003;</div>
        </div>
      </div>
      <div class="next-container" :class="{hide: currentSurvey == 3, finished: finishedSurvey}">
        <div class="next-survey-btn survey-btn" @click="showNextSurvey">&#62;</div>
      </div>
    </div>
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

export default {
  // name: "App",
  data() {
    return {
      // General Data
      currentSurvey: 2,
      carrusel: [image1, image2, image3, image4, image5, image6],
      previusImage: null,
      currentImage: 0,
      nextImage: 1,
      finishedSurvey: false,
      // Surevy One Data
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
      // Surevy two Data
      selectedRate: 0,
      //Survey Three Data
      selectedBoxes: [],
    };
  },
  created() {},
  methods: {
    // General Rules for all Survey
    showNextSurvey() {
      if (this.currentSurvey != 3) {
        this.currentSurvey++;
        this.resetSurvey();
      }
    },
    showPreviusSurvey() {
      if (this.currentSurvey != 1) {
        this.currentSurvey--;
        this.resetSurvey();
      }
    },
    resetSurvey() {
      this.previusImage = null;
      this.currentImage = 0;
      this.nextImage = 1;
      this.finishedSurvey = false;
      this.selectedBoxes = [];
    },
    showNextImage() {
      if (this.currentImage !== 5) {
        this.previusImage = this.currentImage;
        this.currentImage++;
        this.nextImage++;
      } else {
        this.finishedSurvey = true;
      }
    },
    //Second Survey
    selectRate(rate) {
      this.selectedRate = rate;
    },
    //Third Survey
    selectBox(index) {
      //If index is NOT inside the array of selected boxes => add it
      //If index is inside the array of selected boxes => remove it

      if (this.selectedBoxes.indexOf(index) == -1) {
        this.selectedBoxes.push(index);
      } else {
        this.selectedBoxes = this.selectedBoxes.filter((el) => el != index);
      }
    },
    nextQuestionEvent() {
      if (this.selectedBoxes.length >= 1) {
        this.showNextImage();
        this.selectedBoxes = [];
      }
    },
  },
};
</script>

<style lang="scss">
$light-blue: #a2d7e9;
$dark-blue: #4291ac;
$white: #fffffff3;
$border-blue: #c2dee7;
$orange: #ec8a2d;
$grey-background: #c3bfbf;
$green: #008000;

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

.wrapper {
  background: rgba($light-blue, 0.7);
  width: 100%;
  height: 100vh;
}

.container {
  max-width: 1100px;
  margin: auto;
}
#app {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .prev-container,
  .next-container {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;

    &.hide > .survey-btn {
      display: none;
    }

    .survey-btn {
      border: 0;
      color: $white;
      background: $grey-background;
      padding: 7px 12px;
      font-family: inherit;
      border-radius: 5px;
      font-size: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      &.finished {
        background: $orange;
      }
    }
  }

  .prev-container {
    justify-content: flex-end;
  }

  .survey.active_survey {
    display: block;
  }

  // General Survey Style

  .survey {
    width: 50%;
    height: 60%;
    color: $white;
    display: none;

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
      border-top: 2px solid $border-blue;
      border-radius: 0 0 5px 5px;
      background: $dark-blue;
      width: 100%;
      height: 92%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;

      .image-carrusel {
        // Transition Using Position Absolute and Overflow Hidden
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
    }

    .completed {
      border-top: 2px solid $border-blue;
      border-radius: 0 0 5px 5px;
      background: $dark-blue;
      width: 100%;
      height: 92%;

      display: flex;
      justify-content: center;
      align-items: flex-start;
      .check-mark {
        font-size: 3rem;
        font-weight: bold;
        color: $green;
        border: 5px solid $green;
        margin-top: 25px;
        background: $white;
        padding: 5px 15px;
        border-radius: 5px;
      }
    }
  }

  #survey-one,
  #survey-three {
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
          text-align: center;
        }

        &.selectedBox {
          background: $orange;
        }
      }
    }
  }

  #survey-two {
    .buttons {
      height: 35%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .stars {
        width: 80%;
        height: 70%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        font-size: 5rem;
        cursor: pointer;

        .selected:before {
          content: "\2605";
          position: absolute;
          color: $orange;
        }
      }
      .text {
        width: 90%;
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
    }
  }

  #survey-three {
    .buttons {
      height: 25%;

      .btn {
        height: 65%;
      }
    }

    .next-image-button {
      height: 10%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        color: $white;
        font-weight: 500;
        font-size: 1.2rem;
        background: transparent;
        padding: 5px 7px;
        margin: 0;
        border: 2px solid $white;
        border-radius: 5px;
        cursor: not-allowed;
        pointer-events: none;

        &.active {
          pointer-events: all;
          cursor: pointer;
          color: $orange;
          border: 2px solid $orange;
          // background: $white;
        }
      }
    }
  }
}
//Small devices portrait
@media only screen and (max-width: 768px) and (orientation: portrait) {
  #app {
    flex-wrap: wrap;

    .prev-container,
    .next-container {
      flex-grow: 1;
      height: 10%;

      &.hide {
        display: none;
      }

      .survey-btn {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
    .prev-container {
      order: 1;
    }
    .next-container {
      order: 2;
    }
    .survey {
      order: 0;
      width: 100%;
      height: 90%;

      .header {
        border-radius: 0;
      }

      .body {
        border-radius: 0;
        .image-carrusel {
          width: 100%;
          height: 55%;
          position: relative;

          img {
            border-radius: 0;
            width: 100%;
            top: 0;
            transform: translate(0, 0);

            &.current {
              transition: 1s;
              right: 0;
            }
          }
        }
      }

      .completed {
        border-radius: 0;
      }
    }

    #survey-one,
    #survey-three {
      .buttons {
        width: 90%;
        height: 35%;
      }
    }

    #survey-two {
      .buttons {
        width: 100%;
        height: 45%;
        .text {
          width: 90%;
          height: 30%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 1050px) {
  #app {
    flex-wrap: wrap;

    .prev-container,
    .next-container {
      flex-grow: 1;
      height: 10%;

      &.hide {
        display: none;
      }

      .survey-btn {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }
    }
    .prev-container {
      order: 1;
    }
    .next-container {
      order: 2;
    }
    .survey {
      order: 0;
      width: 100%;
      height: 90%;

      .header {
        border-radius: 0;
        font-size: 2rem;
      }

      .body {
        border-radius: 0;
        .image-carrusel {
          width: 100%;
          height: 55%;
          position: relative;

          img {
            border-radius: 0;
            width: 100%;
            top: 0;
            transform: translate(0, 0);

            &.current {
              transition: 1s;
              right: 0;
            }
          }
        }
      }

      .completed {
        border-radius: 0;
      }
    }

    #survey-one,
    #survey-three {
      .buttons {
        width: 90%;
        height: 35%;
        .btn {
          p {
            font-size: 1.5rem;
          }
        }
      }
    }

    #survey-two {
      .buttons {
        width: 100%;
        height: 45%;
        .stars {
          font-size: 8rem;
        }
        .text {
          width: 90%;
          height: 30%;
          font-size: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
      }
    }
  }
}
</style>
