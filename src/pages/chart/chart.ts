import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class ChartPage {
  options: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.options = {
      chart: {type: 'bar'},
      title: { text: 'simple chart' },
      series: []
    };

/*
{
            name: 'Year 1800',
            data: [107, 31, 635, 203, 2]
        }, {
            name: 'Year 1900',
            data: [133, 156, 947, 408, 6]
        }, {
            name: 'Year 2012',
            data: [1052, 954, 4250, 740, 38]
        }
*/    
    this.options.series.push({ name: 'Year 1800', data: [107, 31, 635, 203, 2] });
    this.options.series.push({name: 'Year 2012',data: [1052, 954, 4250, 740, 38]});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

}
