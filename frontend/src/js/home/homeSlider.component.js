class homeSliderCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;

        this.slides = [ {image:'images/slider/portada1.png',text:"Listen what you want.", id: 0},
                    {image:'images/slider/portada2.jpg',text:"When you want.", id: 1},
                    {image:'images/slider/portada3.jpg',text:"And where you want.", id: 2}];
    }
}

let homeSlider = {
    controller: homeSliderCtrl,
    templateUrl: 'home/homeSlider.html'
};

export default homeSlider;