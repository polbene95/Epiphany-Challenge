import { mount, done } from '@vue/test-utils'
import App from '@/App.vue'


describe('App.vue', () => {
    it('currentSurvey is one by default', () => {
        const wrapper = mount(App)
        expect(wrapper.vm.currentSurvey).toBe(1)
    })
    it('On clicking next survey button it increse by one', () => {
        const wrapper = mount(App)
        wrapper.find('div.next-survey-btn.survey-btn').trigger('click')
        expect(wrapper.vm.currentSurvey).toBe(2)

    })
    it('On clicking next survey button if currentSurvey is 3 nothing happens', () => {
        const wrapper = mount(App)
        wrapper.vm.currentSurvey = 3
        wrapper.find('div.next-survey-btn.survey-btn').trigger('click')
        expect(wrapper.vm.currentSurvey).toBe(3)
    })

    it('On clicking previus survey button it decrese by one', () => {
        const wrapper = mount(App)
        wrapper.vm.currentSurvey = 3
        wrapper.find('div.previus-survey-btn.survey-btn').trigger('click')
        expect(wrapper.vm.currentSurvey).toBe(2)

    })
    it('On clicking previus survey button if currentSurvey is 1 nothing happens', () => {
        const wrapper = mount(App)
        wrapper.vm.currentSurvey = 1
        wrapper.find('div.previus-survey-btn.survey-btn').trigger('click')
        expect(wrapper.vm.currentSurvey).toBe(1)
    })

    it('Calling resetSurvey resets all elements to original value', () => {
        const wrapper = mount(App)
        wrapper.vm.previusImage = 3
        wrapper.vm.currentImage = 4
        wrapper.vm.nextImage = 5
        wrapper.vm.finishedSurvey = false;
        wrapper.vm.selectedBoxes = [1, 2]
        wrapper.vm.resetSurvey()
        expect(wrapper.vm.previusImage).toBe(null)
        expect(wrapper.vm.currentImage).toBe(0)
        expect(wrapper.vm.nextImage).toBe(1)
        expect(wrapper.vm.finishedSurvey).toBe(false)
        expect(wrapper.vm.selectedBoxes).toStrictEqual([])
    })

    it('Calling showNextImage changes de values of current, previus and next image', () => {
        const wrapper = mount(App)
        wrapper.vm.previusImage = null
        wrapper.vm.currentImage = 1
        wrapper.vm.nextImage = 2
        wrapper.vm.showNextImage()
        expect(wrapper.vm.previusImage).toBe(1)
        expect(wrapper.vm.currentImage).toBe(2)
        expect(wrapper.vm.nextImage).toBe(3)
    })
    it('Calling showNextImage if current image is equal to 5 sets finished Survey to true', async () => {
        const wrapper = mount(App)
        wrapper.vm.previusImage = 4
        wrapper.vm.currentImage = 5
        wrapper.vm.nextImage = 6
        wrapper.vm.finishedSurvey = false;
        wrapper.vm.showNextImage()
        wrapper.vm.$nextTick(() => {
            expect(wrapper.vm.finishedSurvey).toBe(true)
            done()
        })
    })
    it('selectRate sets selectedRate to the right Value ', () => {
        const wrapper = mount(App)
        wrapper.vm.selectedRate = 0
        wrapper.vm.selectRate(2)
        expect(wrapper.vm.selectedRate).toBe(2)

    })
    it('mouseover on each star triggers selectRate ', () => {
        const wrapper = mount(App)
        wrapper.vm.selectedRate = 0
        wrapper.find('div.stars:first-child > span').trigger('mouseover')
        expect(wrapper.vm.selectedRate).toBe(1)

    })
    it('Calling selectBox if the index is already in the array will remove it ', () => {
        const wrapper = mount(App)
        wrapper.vm.selectedBoxes = [1, 2, 3]
        wrapper.vm.selectBox(1)
        expect(wrapper.vm.selectedBoxes).toStrictEqual([2, 3])
    })
    it('Calling selectBox if the index is not already in the array will add it ', () => {
        const wrapper = mount(App)
        wrapper.vm.selectedBoxes = [2, 3]
        wrapper.vm.selectBox(1)
        expect(wrapper.vm.selectedBoxes).toStrictEqual([2, 3, 1])
    })
    it('Calling nextQuestionEvent if selectedBoxes length is lower than 1 does nothing', () => {
        const wrapper = mount(App)
        wrapper.vm.selectedBoxes = []
        wrapper.vm.currentImage = 3
        expect(wrapper.vm.currentImage).toBe(3)
    })
    it('Calling nextQuestionEvent if selectedBoxes length is not lower than 1 does execute showNextImage', () => {
        const wrapper = mount(App)
        wrapper.vm.selectedBoxes = [1]
        wrapper.vm.currentImage = 3
        expect(wrapper.vm.currentImage).toBe(4)
    })



    //   nextQuestionEvent() {
    //     if (this.selectedBoxes.length >= 1) {
    //       this.showNextImage();
    //       this.selectedBoxes = [];
    //     }
    //   },


})
