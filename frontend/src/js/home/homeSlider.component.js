class HomeSliderCtrl {
    constructor() {
        this.myInterval = 5080;
        this.noWrapSlider = false;

        this.slides = [
            {image: '../../images/portada1.png', text: 'TEsting'}
        ];
    }// end_constructor
}// end_HomeSliderCtrl

let homeSlider = {
    controller: HomeSliderCtrl,
    templateUrl: 'home/homeSlider.html'
};

export default homeSlider;